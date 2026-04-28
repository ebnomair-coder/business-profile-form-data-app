# 📋 Data Form App — نموذج جمع بيانات Google Business Profile

تطبيق ويب لجمع بيانات العملاء المطلوبة لإعداد **ملفهم التجاري على Google (Google Business Profile)**، ضمن خدمات وكالة **ابن عمير (EbnOmair)**.

---

## 🎯 الهدف

تسهيل عملية جمع المعلومات من العميل بشكل منظم وسريع، بدلاً من التواصل المتكرر عبر الرسائل. يقوم العميل بملء النموذج مرة واحدة ويتم حفظ جميع البيانات والصور تلقائياً في Firebase.

---

## 🧩 أقسام النموذج

| # | القسم | الحقول |
|---|-------|--------|
| 1 | **البيانات الأساسية** | الاسم التجاري، العنوان الدقيق، رقم الهاتف |
| 2 | **الصور والشعار** | رفع الشعار (Logo) + صور المقر والمنتجات (5 صور كحد أدنى) |
| 3 | **نبذة عن النشاط** | وصف مبسط للخدمات (يتم صياغته تسويقياً لاحقاً) |
| 4 | **حساب Gmail** | بريد Gmail لربط ملكية الملف التجاري |

---

## 🛠️ التقنيات المستخدمة

- **React 19** — بناء واجهة المستخدم
- **Vite 8** — أداة التطوير والبناء السريع
- **Firebase Firestore** — تخزين بيانات النموذج
- **Firebase Storage** — رفع وتخزين الصور والشعارات
- **Lucide React** — أيقونات الواجهة

---

## 📁 هيكل المشروع

```
src/
├── App.jsx              # المكوّن الرئيسي
├── firebase.js          # إعدادات الاتصال بـ Firebase
├── main.jsx             # نقطة الدخول
├── components/
│   └── DataForm.jsx     # نموذج جمع البيانات (المكوّن الأساسي)
├── index.css            # التنسيقات العامة
├── App.css              # تنسيق التطبيق
└── form.css             # تنسيق النموذج
```

---

## 🚀 التشغيل المحلي

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# بناء النسخة الإنتاجية
npm run build
```

---

## ⚙️ إعداد Firebase

قبل تشغيل التطبيق بشكل فعلي، يجب تحديث ملف `src/firebase.js` بإعدادات مشروع Firebase الخاص بك:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

> ⚠️ **تنبيه:** لن يعمل إرسال النموذج بدون إعداد Firebase بشكل صحيح.

---

## 🔄 آلية العمل

1. العميل يفتح الرابط ويملأ النموذج
2. يرفع الشعار وصور المقر/المنتجات
3. عند الضغط على **إرسال البيانات**:
   - تُرفع الصور إلى **Firebase Storage**
   - تُحفظ جميع البيانات مع روابط الصور في **Firestore**
4. تظهر رسالة تأكيد للعميل

---

## 📜 الرخصة

هذا المشروع تابع لوكالة **ابن عمير** — جميع الحقوق محفوظة.

---

## 🛠 Workflow & CI/CD Guide
For detailed instructions on how this project was connected to GitHub and Firebase Hosting for automated deployments, check out the [Workflow Guide](file:///C:/Users/Mo/.gemini/antigravity/brain/5dd27399-69a6-4f2e-8530-576fcdca4208/workflow_guide.md).
