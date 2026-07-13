**StatTile** — the brand's signature metric unit. Big mono number, uppercase label, optional delta. Use for dashboards, progress, PRs.

```jsx
<StatTile value="185" unit="lb" label="Top set" delta="+8% vs last week" />
<StatTile value="12" label="Day streak" dark icon={<i data-lucide="flame"></i>} />
```

`deltaTone`: `green` (up/good) · `red` (down) · `neutral`. `dark` for dark surfaces.
