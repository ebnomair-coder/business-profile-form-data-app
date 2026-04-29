import React, { useState } from 'react';
import { 
  FileSignature, 
  Camera, 
  PenSquare, 
  Mail, 
  CloudUpload, 
  Images, 
  Loader2, 
  Send,
  MessageSquare,
  MapPin
} from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../form.css';

const DataForm = () => {
  const [formData, setFormData] = useState({
    tradeName: '',
    phone: '',
    gmail: '',
    description: '',
    city: '',
    street: '',
    postalCode: '',
  });

  const [logo, setLogo] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (photos.length < 5 && photos.length > 0) {
      alert('يرجى رفع 5 صور على الأقل كما هو مطلوب.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload Logo
      const logoUrl = await uploadFile(logo, 'logos');

      // 2. Upload Photos
      const photoUrls = await Promise.all(
        photos.map(file => uploadFile(file, 'photos'))
      );

      // 3. Save Data to Firestore
      await addDoc(collection(db, 'submissions'), {
        ...formData,
        logoUrl,
        photoUrls,
        createdAt: new Date(),
      });

      alert('تم إرسال البيانات بنجاح! سنتواصل معك قريباً.');
      
      // Reset Form
      setFormData({
        tradeName: '',
        phone: '',
        gmail: '',
        description: '',
        city: '',
        street: '',
        postalCode: '',
      });
      setLogo(null);
      setPhotos([]);
      setPreviews([]);
      e.target.reset();

    } catch (error) {
      console.error("Error submitting form: ", error);
      alert('حدث خطأ أثناء الإرسال. يرجى التأكد من إعدادات Firebase الخاصة بك.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container" dir="rtl">
      <div className="form-header">
        <h2>البيانات المطلوبة</h2>
        <p>للبدء بتنفيذ الخدمة، نحتاج منك هذه المعلومات البسيطة فقط:</p>
      </div>

      <form onSubmit={handleSubmit} className="data-form">
        
        {/* Section 1: Basic Data */}
        <div className="form-section">
          <div className="section-title">
            <FileSignature size={24} />
            <h3>البيانات الأساسية</h3>
          </div>
          
          <div className="input-group">
            <label htmlFor="tradeName">الاسم التجاري (اجباري)</label>
            <input 
              type="text" 
              id="tradeName" 
              name="tradeName" 
              required 
              placeholder="أدخل اسم نشاطك التجاري"
              value={formData.tradeName}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">رقم الهاتف (اجباري)</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              placeholder="مثال: 05XXXXXXXX"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Section 2: Gmail Account */}
        <div className="form-section">
          <div className="section-title">
            <Mail size={24} />
            <h3>حساب Gmail</h3>
          </div>
          
          <div className="input-group">
            <label htmlFor="gmail">بريد Gmail (اختياري)</label>
            <p className="field-hint">لربط ملكية الملف التجاري بك.</p>
            <input 
              type="email" 
              id="gmail" 
              name="gmail" 
              placeholder="example@gmail.com"
              value={formData.gmail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Section 3: About Activity */}
        <div className="form-section">
          <div className="section-title">
            <PenSquare size={24} />
            <h3>نبذة عن النشاط</h3>
          </div>
          
          <div className="input-group">
            <label htmlFor="description">وصف مبسط لخدماتك (اجباري)</label>
            <p className="field-hint">سنقوم بصياغته تسويقياً من أجلك.</p>
            <textarea 
              id="description" 
              name="description" 
              rows="4" 
              required 
              placeholder="اكتب هنا نبذة عن ما يقدمه نشاطك التجاري..."
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Section 4: Exact Address */}
        <div className="form-section">
          <div className="section-title">
            <MapPin size={24} />
            <h3>العنوان الدقيق</h3>
          </div>
          
          <div className="input-group">
            <label htmlFor="city">المدينة (اجباري)</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              required 
              placeholder="مثال: الرياض"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="street">الشارع (اجباري)</label>
            <input 
              type="text" 
              id="street" 
              name="street" 
              required 
              placeholder="مثال: شارع العليا"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="postalCode">الرمز البريدي (اجباري)</label>
            <input 
              type="text" 
              id="postalCode" 
              name="postalCode" 
              required 
              placeholder="مثال: 12345"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-title">
            <Send size={24} />
            <h3>الصور والشعار</h3>
          </div>

          <div className="whatsapp-reminder">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <div className="whatsapp-reminder-text">
              <h4>يرجى إرسال الصور والشعار عبر الواتساب</h4>
              <p>رقم الواتساب: +966 5xxxxxxx</p>
            </div>
          </div>
        </div>


        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="spinner" size={24} />
          ) : (
            <Send size={24} />
          )}
          {isSubmitting ? 'جاري الإرسال...' : 'إرسال البيانات'}
        </button>
      </form>
    </div>
  );
};

export default DataForm;
