# 🎯 CSS Grid Interactive Tutorial - Reusable Architecture

## 📚 Overview

This is an interactive educational project for Learning CSS (Grid & Flexbox) built with React and Tailwind CSS. It is designed with a clean and fully reusable architecture.

## 🏗️ Architecture

### Reusable Components

#### 1. **CodeInput**

```jsx
<CodeInput
  value={state}
  onChange={setState}
  hint="Expected value"
  width="w-40"
  id="unique-id"
/>
```

**Usage:** Any code input field that needs a hint and live updates.

---

#### 2. **CodeEditor**

```jsx
<CodeEditor>
  <CodeLine>/* your code here */</CodeLine>
</CodeEditor>
```

**Usage:** To display code blocks with a dark background.

---

#### 3. **CodeLine**

```jsx
<CodeLine indent={1}>
  <Property>display</Property>: <Value>grid</Value>;
</CodeLine>
```

**Props:**

- `indent`: Indentation level (0, 1, 2, ...)

---

#### 4. **Property**

```jsx
<Property>grid-template-columns</Property>
```

**Usage:** To color property names pink.

---

#### 5. **Value**

```jsx
<Value>1fr</Value>
```

**Usage:** To color values green.

---

#### 6. **Comment**

```jsx
<Comment>/* Explanatory comment */</Comment>
```

**Usage:** To add gray italic comments.

---

#### 7. **GridPreview**

```jsx
<GridPreview gridStyles={{ display: "grid", gap: "10px" }} label="👇 Preview:">
  <GridItem>1</GridItem>
  <GridItem>2</GridItem>
</GridPreview>
```

**Usage:** To display the grid with live updates.

---

#### 8. **GridItem**

```jsx
<GridItem style={{ gridArea: "header" }}>Content</GridItem>
```

**Usage:** Items inside the grid.

---

#### 9. **HintBox**

```jsx
<HintBox title="💡 Tips:">
  <ul>
    <li>Tip 1</li>
    <li>Tip 2</li>
  </ul>
</HintBox>
```

**Usage:** To display tips and guidance.

---

#### 10. **AnswerKey**

```jsx
<AnswerKey show={showAnswer} onToggle={() => setShowAnswer(!showAnswer)}>
  <p>Correct answer here</p>
</AnswerKey>
```

**Usage:** To toggle answer visibility.

---

#### 11. **ExerciseSection**

```jsx
<ExerciseSection title="Exercise 1">{/* Exercise content */}</ExerciseSection>
```

**Usage:** To organize exercises into sections.

---

#### 12. **Explanation**

```jsx
<Explanation>
  <p>Exercise explanation here</p>
</Explanation>
```

**Usage:** To explain exercise requirements.

---

## 🔄 Reusability Examples

### Example 1: Creating a Flexbox Exercise

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
    <ExerciseSection title="Flexbox Exercise">
      <Explanation>
        <p>Create a layout using Flexbox</p>
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

## 📦 Installation & Usage

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Run Locally

```bash
npm run dev
# or
pnpm dev
```

### 3. Build for Production

```bash
npm run build
```

---

## 🚀 Features

✅ **Clean Architecture**: Each component is independently reusable  
✅ **React 19 & Vite**: Fast and modern  
✅ **Tailwind CSS**: Rapid styling  
✅ **TypeScript**: Fully typed codebase  
✅ **Responsive Design**: Mobile-friendly sidebar and layouts  
✅ **Live Preview**: Real-time updates as you type code  
✅ **Animations**: Smooth transitions using Framer Motion

---

## 💡 Expansion Ideas

1. **More Exercises**: Position, Transform, Transitions
2. **Scoring System**: Track student progress
3. **Save Progress**: Use localStorage
4. **Challenge Mode**: Timed advanced exercises
5. **Share Solutions**: QR code or link sharing
6. **Dark Mode**: Eye-friendly interface

---

## 📝 Important Notes

- All components are independent and can be used in any project.
- The design is fully responsive.
- Supports both RTL (current default) and LTR.
- Components support full customization via props.

---

## 🤝 Contribution

This architecture is open for development and improvement. You can:

- Add new components
- Improve design
- Add other languages
- Add new features

---

## 📄 License

This project is open source and available for free use.

---

**Good luck with your project development! 🚀**
