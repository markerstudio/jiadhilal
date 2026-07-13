**Switch** — settings toggle (notifications, rest-day reminders, units). Track turns brand purple when on.

```jsx
<Switch label="Rest-day reminders" defaultChecked onChange={(on) => save(on)} />
```

Controlled via `checked` or uncontrolled via `defaultChecked`. Sizes `sm | md`.
