# Lighthouse 100/100 Performance Optimization Checklist

Auditing guidelines and asset optimization strategies to guarantee 100/100 Core Web Vitals across mobile and desktop.

## 1. Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** $< 1.2\text{ s}$
- **First Input Delay (FID) / Interaction to Next Paint (INP):** $< 40\text{ ms}$
- **Cumulative Layout Shift (CLS):** $0.000$ (Zero layout shifts)

## 2. Asset Delivery Strategies

- Modern image encoding: AVIF with WebP fallbacks; explicit `width` and `height` dimensional attributes.
- Self-hosted system fonts with `font-display: swap` to eliminate FOIT (Flash of Invisible Text).
- Code splitting via dynamic imports for off-screen showcase interactive models.

