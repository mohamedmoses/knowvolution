import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton, 
  Paper,
  Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} edge="start" sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">
          {t('more.privacy')}
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
          سياسة الخصوصية
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          آخر تحديث: 1 أغسطس 2023
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" paragraph>
          مرحبًا بك في أزرقي. نحن نقدر ثقتك ونلتزم بحماية خصوصيتك. تصف سياسة الخصوصية هذه كيفية جمع واستخدام ومشاركة معلوماتك الشخصية عند استخدام موقعنا الإلكتروني وتطبيقنا.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          المعلومات التي نجمعها
        </Typography>
        <Typography variant="body1" paragraph>
          نجمع معلومات شخصية مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك عندما تنشئ حسابًا، أو تتواصل معنا، أو تضيف عقارًا أو تهتم بعقار.
        </Typography>
        <Typography variant="body1" paragraph>
          نجمع أيضًا معلومات غير شخصية مثل نوع المتصفح وعنوان IP والوقت الذي تقضيه على موقعنا وصفحات الويب التي تزورها.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          كيفية استخدام معلوماتك
        </Typography>
        <Typography variant="body1" paragraph>
          نستخدم المعلومات التي نجمعها للأغراض التالية:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" paragraph>
            توفير خدماتنا وتحسينها وتخصيصها
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            التواصل معك بشأن حسابك واستفساراتك وطلباتك
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            إرسال إشعارات وتحديثات ورسائل تسويقية (يمكنك إلغاء الاشتراك في أي وقت)
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            تحسين موقعنا وتطبيقنا وفهم كيفية استخدام المستخدمين لخدماتنا
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            منع الاحتيال وحماية حقوقنا القانونية
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          مشاركة المعلومات
        </Typography>
        <Typography variant="body1" paragraph>
          قد نشارك معلوماتك الشخصية في الحالات التالية:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" paragraph>
            مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا وتقديم خدماتنا
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            عندما تختار مشاركة معلوماتك مع بائعي أو مشتري العقارات
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            للامتثال للقانون أو حماية حقوقنا أو سلامة مستخدمينا
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            في حالة الاندماج أو الاستحواذ أو بيع الأصول، قد يتم نقل معلوماتك كجزء من المعاملة
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          أمان البيانات
        </Typography>
        <Typography variant="body1" paragraph>
          نتخذ تدابير أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به والإفصاح غير المصرح به. ومع ذلك، لا يمكن ضمان الأمان الكامل للبيانات المرسلة عبر الإنترنت.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          حقوقك
        </Typography>
        <Typography variant="body1" paragraph>
          تختلف حقوقك فيما يتعلق بمعلوماتك الشخصية حسب البلد أو المنطقة التي تعيش فيها. قد تشمل هذه الحقوق:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" paragraph>
            الوصول إلى معلوماتك الشخصية وتصحيحها
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            حذف معلوماتك الشخصية
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            الاعتراض على معالجة معلوماتك الشخصية
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            نقل معلوماتك الشخصية
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            سحب موافقتك في أي وقت
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          ملفات تعريف الارتباط
        </Typography>
        <Typography variant="body1" paragraph>
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك اختيار تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك، ولكن قد يؤثر ذلك على وظائف معينة في موقعنا.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          الأطفال
        </Typography>
        <Typography variant="body1" paragraph>
          خدماتنا غير موجهة للأطفال دون سن 16 عامًا، ولا نجمع عن قصد معلومات شخصية من الأطفال دون موافقة الوالدين.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          التغييرات على سياسة الخصوصية
        </Typography>
        <Typography variant="body1" paragraph>
          قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية من خلال نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث".
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
          اتصل بنا
        </Typography>
        <Typography variant="body1" paragraph>
          إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          البريد الإلكتروني: privacy@azraqi.com
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          الهاتف: +20 123 456 7890
        </Typography>
      </Paper>
    </Container>
  );
};

export default Privacy;
