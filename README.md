Install Dependencies

Run cd backend && npm i to install backend dependencies.

Run cd frontend && npm i to install frontend dependencies.

Environment Variables

The backend includes a .env.sample; copy it to .env and edit as needed.

The frontend currently has the backend URL hardcoded. If you want to use environment variables, use the format import.meta.env.VARIABLE_NAME in code (example: import.meta.env.VITE_API_URL) and list variables in a .env file with the VITE_ prefix.

Features
Login & Signup for both visitors and artists are done.

Artwork post and showcase for artists is working.

Project-wide conventions and documentation are provided in the codebase.

What’s Missing
Artist inventory and artwork post dashboard frontend are not built but backend is done ; you should follow conventions from the rest of the project when implementing these.

No notification (like toastify) for successful login/signup—add feedback for those flows.

Notes
Review all code conventions and documented API shapes before building new sections.

After login/signup, you’ll see success, but notifications aren’t implemented—add them as needed.
