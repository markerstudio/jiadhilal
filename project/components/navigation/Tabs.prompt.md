**Tabs** — switch between views within a screen (Overview / Workouts / Nutrition).

```jsx
<Tabs tabs={['Overview','Workouts','Nutrition']} onChange={setView} />
<Tabs variant="pill" tabs={['Week','Month','Year']} />
```

`underline` (default) for page sections; `pill` for compact filters. Controlled via `value` or uncontrolled via `defaultValue`.
