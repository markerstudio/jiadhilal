**Input** — labeled text field for forms (login, profile, log entry). Focus shows the brand purple ring.

```jsx
<Input label="Email" type="email" placeholder="you@example.com"
       iconLeft={<i data-lucide="mail"></i>} />
<Input label="Bodyweight (lb)" error="Enter a number" />
```

Props: `label`, `hint`, `error` (turns the field red), `iconLeft`, `disabled`, `fullWidth` (default true).
