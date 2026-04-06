# Project Guidelines

## Code Style
- Use standalone components with explicit imports in component metadata
- Follow TypeScript strict mode settings
- Reference key files: [angular-ecommerce/src/app/app.config.ts](angular-ecommerce/src/app/app.config.ts) for configuration patterns

## Architecture
- Hybrid state management: BehaviorSubject for complex state, Angular Signals for reactive UI
- Functional HTTP interceptors for authentication and loading
- Role-based routing with guards
- Two separate Angular applications: angular-ecommerce (mock API) and bus-ticket-booking (external API)

## Build and Test
- angular-ecommerce: `npm start` (dev), `npm run json-server` (mock API), `npm run build`, `npm test`
- bus-ticket-booking: `npm start` (dev), `npm run build`, `npm test`
- Both support SSR: `npm run serve:ssr:{project-name}`

## Conventions
- API URLs in core/constants, not environments
- Custom validators in shared/validators
- Alert and loader services use Signals with auto-clear
- Always check `typeof window !== 'undefined'` for SSR compatibility
- Avoid subscription leaks; use OnDestroy for cleanup

See [README.md](README.md) for project descriptions.