import './App.css'
import '../i18n.ts';
import RouterComponent from './routes/index.tsx';
import { AuthProvider } from './hooks/useAuth.tsx';

function App() {

  return (
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  )
}

export default App