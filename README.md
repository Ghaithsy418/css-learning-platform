# 🎯 CSS Grid Interactive Tutorial - معمارية قابلة لإعادة الاستخدام

## 📚 نظرة عامة

هذا مشروع تعليمي تفاعلي لـ CSS Grid مبني بـ React و Tailwind CSS. تم تصميمه بمعمارية نظيفة وقابلة لإعادة الاستخدام بالكامل.

## 🏗️ المعمارية - Architecture

### المكونات القابلة لإعادة الاستخدام (Reusable Components)

#### 1. **CodeInput** - حقل الإدخال

```jsx
<CodeInput
  value={state}
  onChange={setState}
  hint="القيمة المتوقعة"
  width="w-40"
  id="unique-id"
/>
```

**الاستخدام:** أي حقل إدخال في الكود يحتاج تلميح وتحديث مباشر

---

#### 2. **CodeEditor** - محرر الكود

```jsx
<CodeEditor>
  <CodeLine>/* your code here */</CodeLine>
</CodeEditor>
```

**الاستخدام:** لعرض أكواد برمجية مع خلفية داكنة

---

#### 3. **CodeLine** - سطر الكود

```jsx
<CodeLine indent={1}>
  <Property>display</Property>: <Value>grid</Value>;
</CodeLine>
```

**الخصائص:**

- `indent`: مستوى المسافة البادئة (0, 1, 2, ...)

---

#### 4. **Property** - خاصية CSS

```jsx
<Property>grid-template-columns</Property>
```

**الاستخدام:** لتلوين أسماء الخصائص باللون الوردي

---

#### 5. **Value** - قيمة CSS

```jsx
<Value>1fr</Value>
```

**الاستخدام:** لتلوين القيم باللون الأخضر

---

#### 6. **Comment** - التعليقات

```jsx
<Comment>/* تعليق توضيحي */</Comment>
```

**الاستخدام:** لإضافة تعليقات بلون رمادي مائل

---

#### 7. **GridPreview** - معاينة الشبكة

```jsx
<GridPreview gridStyles={{ display: "grid", gap: "10px" }} label="👇 معاينة:">
  <GridItem>1</GridItem>
  <GridItem>2</GridItem>
</GridPreview>
```

**الاستخدام:** لعرض الشبكة مع التحديث المباشر

---

#### 8. **GridItem** - عنصر الشبكة

```jsx
<GridItem style={{ gridArea: "header" }}>المحتوى</GridItem>
```

**الاستخدام:** عناصر داخل الشبكة

---

#### 9. **HintBox** - صندوق النصائح

```jsx
<HintBox title="💡 نصائح:">
  <ul>
    <li>نصيحة 1</li>
    <li>نصيحة 2</li>
  </ul>
</HintBox>
```

**الاستخدام:** لعرض النصائح والإرشادات

---

#### 10. **AnswerKey** - صندوق الإجابة

```jsx
<AnswerKey show={showAnswer} onToggle={() => setShowAnswer(!showAnswer)}>
  <p>الإجابة الصحيحة هنا</p>
</AnswerKey>
```

**الاستخدام:** لعرض وإخفاء الإجابات

---

#### 11. **ExerciseSection** - قسم التمرين

```jsx
<ExerciseSection title="التمرين الأول">{/* محتوى التمرين */}</ExerciseSection>
```

**الاستخدام:** لتنظيم التمارين في أقسام

---

#### 12. **Explanation** - الشرح

```jsx
<Explanation>
  <p>شرح التمرين هنا</p>
</Explanation>
```

**الاستخدام:** لشرح متطلبات التمرين

---

## 🔄 كيفية إعادة الاستخدام

### مثال 1: إنشاء تمرين Flexbox

```jsx
const FlexboxExercise = () => {
  const [display, setDisplay] = useState("");
  const [direction, setDirection] = useState("");
  const [justify, setJustify] = useState("");

  const flexStyles = {
    display: display || "block",
    flexDirection: direction || "row",
    justifyContent: justify || "flex-start",
  };

  return (
    <ExerciseSection title="تمرين Flexbox">
      <Explanation>
        <p>أنشئ layout باستخدام Flexbox</p>
      </Explanation>

      <CodeEditor>
        <CodeLine>.flex-container {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>display</Property>:{" "}
          <CodeInput value={display} onChange={setDisplay} hint="flex" />;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>flex-direction</Property>:{" "}
          <CodeInput value={direction} onChange={setDirection} hint="row" />;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>justify-content</Property>:{" "}
          <CodeInput value={justify} onChange={setJustify} hint="center" />;
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>
      </CodeEditor>

      <div className="p-5 bg-white rounded border-2">
        <div style={flexStyles}>
          <div className="bg-blue-500 text-white p-4 m-2 rounded">1</div>
          <div className="bg-blue-500 text-white p-4 m-2 rounded">2</div>
          <div className="bg-blue-500 text-white p-4 m-2 rounded">3</div>
        </div>
      </div>
    </ExerciseSection>
  );
};
```

---

### مثال 2: تمرين Animations

```jsx
const AnimationExercise = () => {
  const [duration, setDuration] = useState("");
  const [timing, setTiming] = useState("");

  return (
    <ExerciseSection title="تمرين التحريك">
      <CodeEditor>
        <CodeLine>.animated {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>animation-duration</Property>:{" "}
          <CodeInput value={duration} onChange={setDuration} hint="2s" />;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>animation-timing-function</Property>:{" "}
          <CodeInput value={timing} onChange={setTiming} hint="ease-in-out" />;
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>
      </CodeEditor>

      <HintBox>
        <ul>
          <li>
            جرب: <code>ease</code>, <code>linear</code>,{" "}
            <code>ease-in-out</code>
          </li>
          <li>
            المدة بالثواني: <code>1s</code>, <code>2s</code>
          </li>
        </ul>
      </HintBox>
    </ExerciseSection>
  );
};
```

---

### مثال 3: تمرين Typography

```jsx
const TypographyExercise = () => {
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [lineHeight, setLineHeight] = useState("");

  const textStyles = {
    fontSize: fontSize || "16px",
    fontWeight: fontWeight || "normal",
    lineHeight: lineHeight || "1.5",
  };

  return (
    <ExerciseSection title="تمرين النصوص">
      <CodeEditor>
        <CodeLine>.text {"{"}</CodeLine>
        <CodeLine indent={1}>
          <Property>font-size</Property>:{" "}
          <CodeInput
            value={fontSize}
            onChange={setFontSize}
            hint="24px"
            width="w-24"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>font-weight</Property>:{" "}
          <CodeInput
            value={fontWeight}
            onChange={setFontWeight}
            hint="bold"
            width="w-24"
          />
          ;
        </CodeLine>
        <CodeLine indent={1}>
          <Property>line-height</Property>:{" "}
          <CodeInput
            value={lineHeight}
            onChange={setLineHeight}
            hint="1.6"
            width="w-24"
          />
          ;
        </CodeLine>
        <CodeLine>{"}"}</CodeLine>
      </CodeEditor>

      <div className="p-5 bg-white rounded border-2">
        <p style={textStyles}>هذا نص تجريبي لمعاينة التنسيقات</p>
      </div>
    </ExerciseSection>
  );
};
```

---

## 🎨 التخصيص

### تغيير الألوان

يمكنك تخصيص الألوان بسهولة باستخدام Tailwind:

```jsx
// بدلاً من purple
<div className="bg-gradient-to-br from-blue-500 to-blue-800">

// بدلاً من الحدود البنفسجية
<div className="border-r-4 border-green-500">
```

### تغيير الخط

```jsx
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
  
  body {
    font-family: 'Tajawal', sans-serif;
  }
`}</style>
```

---

## 📦 التثبيت والاستخدام

### 1. إنشاء مشروع React جديد

```bash
npx create-react-app grid-tutorial
cd grid-tutorial
```

### 2. تثبيت Tailwind CSS

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 3. إعداد Tailwind

في `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

في `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. استخدام المكون

```jsx
import CSSGridTutorial from "./CSSGridTutorial";

function App() {
  return <CSSGridTutorial />;
}
```

---

## 🚀 المميزات

✅ **معمارية نظيفة**: كل مكون قابل لإعادة الاستخدام بشكل مستقل  
✅ **Tailwind CSS**: تصميم سريع ومرن  
✅ **TypeScript Ready**: يمكن تحويله بسهولة  
✅ **RTL Support**: دعم كامل للعربية  
✅ **Live Preview**: معاينة مباشرة للتغييرات  
✅ **Responsive**: متجاوب مع جميع الأحجام

---

## 💡 أفكار للتوسع

1. **إضافة تمارين أخرى**: Position, Transform, Transitions
2. **نظام النقاط**: تتبع تقدم الطالب
3. **حفظ التقدم**: localStorage للحفظ المحلي
4. **وضع التحدي**: تمارين متقدمة بوقت محدد
5. **مشاركة الحلول**: QR code أو link للمشاركة
6. **Dark Mode**: وضع داكن للعيون

---

## 📝 ملاحظات مهمة

- جميع المكونات مستقلة ويمكن استخدامها في أي مشروع
- التصميم responsive بشكل كامل
- يمكن تغيير اللغة من RTL إلى LTR بسهولة
- المكونات تدعم التخصيص الكامل عبر props

---

## 🤝 المساهمة

هذه المعمارية مفتوحة للتطوير والتحسين. يمكنك:

- إضافة مكونات جديدة
- تحسين التصميم
- إضافة لغات أخرى
- إضافة ميزات جديدة

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

---

**بالتوفيق في تطوير مشاريعك! 🚀**
