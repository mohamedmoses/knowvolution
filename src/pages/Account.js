import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Typography, 
  Box, 
  TextField,
  Button,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  ArrowBack, 
  PhotoCamera,
  Google,
  Facebook
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, login, signup, loginWithGoogle, loginWithFacebook } = useAuth();
  
  const [tab, setTab] = useState(0); // 0 for login, 1 for register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    // Reset form when switching tabs
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      if (tab === 0) {
        // Login
        await login(email, password);
        setSuccess('تم تسجيل الدخول بنجاح');
        setTimeout(() => navigate('/'), 1500);
      } else {
        // Register
        await signup(email, password, displayName);
        setSuccess('تم إنشاء الحساب بنجاح');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.');
      console.error(error);
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول بواسطة جوجل');
      console.error(error);
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      await loginWithFacebook();
      navigate('/');
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول بواسطة فيسبوك');
      console.error(error);
    }
    setLoading(false);
  };

  // If user is already logged in, show profile page
  if (currentUser) {
    return (
      <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBack} edge="start" sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">
            {t('more.account')}
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || ''}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  right: 0, 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
                size="small"
              >
                <PhotoCamera fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="h6">
              {currentUser.displayName || 'المستخدم'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {currentUser.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            معلومات الحساب
          </Typography>
          
          <TextField
            label="الاسم"
            fullWidth
            margin="normal"
            defaultValue={currentUser.displayName || ''}
          />
          
          <TextField
            label="البريد الإلكتروني"
            fullWidth
            margin="normal"
            defaultValue={currentUser.email}
            disabled
          />
          
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            حفظ التغييرات
          </Button>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom color="error">
            إعدادات الأمان
          </Typography>
          
          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth 
            sx={{ mb: 2 }}
          >
            تغيير كلمة المرور
          </Button>
          
          <Button 
            variant="outlined" 
            color="error" 
            fullWidth
          >
            حذف الحساب
          </Button>
        </Paper>
      </Container>
    );
  }
  
  // Otherwise show login/register form
  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} edge="start" sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">
          {t('more.account')}
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 3 }}
        >
          <Tab label="تسجيل الدخول" />
          <Tab label="إنشاء حساب" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              label="الاسم"
              fullWidth
              margin="normal"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required={tab === 1}
            />
          )}
          
          <TextField
            label="البريد الإلكتروني"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextField
            label="كلمة المرور"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {tab === 0 ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </Button>
        </form>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Divider>
            <Typography variant="body2" color="textSecondary">
              أو
            </Typography>
          </Divider>
        </Box>

        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {tab === 0 ? 'تسجيل الدخول باستخدام جوجل' : 'إنشاء حساب باستخدام جوجل'}
        </Button>
        
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<Facebook />}
          onClick={handleFacebookLogin}
          disabled={loading}
        >
          {tab === 0 ? 'تسجيل الدخول باستخدام فيسبوك' : 'إنشاء حساب باستخدام فيسبوك'}
        </Button>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Account;
