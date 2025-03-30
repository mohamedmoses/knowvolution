import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton, 
  Paper,
  Divider,
  Grid,
  Avatar
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Team members data
const teamMembers = [
  {
    name: 'أحمد محمد',
    position: 'المؤسس والرئيس التنفيذي',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'خبير عقاري بخبرة 15 عامًا في مجال التطوير العقاري والاستثمار'
  },
  {
    name: 'سارة أحمد',
    position: 'مدير التسويق',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'متخصصة في التسويق الرقمي مع خبرة 8 سنوات في قطاع العقارات'
  },
  {
    name: 'محمد علي',
    position: 'مدير تقني',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'مهندس برمجيات مع خبرة في تطوير تطبيقات الويب والجوال لأكثر من 10 سنوات'
  }
];

const About = () => {
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
          {t('more.aboutUs')}
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            أزرقي
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            منصة عقارية مبتكرة تربط بين البائعين والمشترين
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          تأسست أزرقي في عام 2023 بهدف تسهيل عملية البحث عن العقارات وتأجيرها وشرائها. نحن نؤمن بأن كل شخص يستحق أن يجد مكانًا يشعر فيه بالراحة والأمان، ونسعى جاهدين لجعل هذه العملية سهلة وممتعة وخالية من المتاعب.
        </Typography>

        <Typography variant="body1" paragraph>
          تتميز منصتنا بواجهة سهلة الاستخدام، وميزات بحث متقدمة، وخدمة عملاء متميزة. نحن نقدم مجموعة واسعة من العقارات، بما في ذلك الشقق والفيلات والمحلات التجارية والمكاتب وغيرها، لتلبية احتياجات جميع العملاء.
        </Typography>

        <Typography variant="body1" paragraph>
          هدفنا هو أن نصبح المنصة العقارية الرائدة في الشرق الأوسط، من خلال تقديم خدمات مبتكرة وذات جودة عالية، والحفاظ على الشفافية والنزاهة في جميع تعاملاتنا.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        فريقنا
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar 
                  src={member.image} 
                  alt={member.name}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  {member.position}
                </Typography>
                <Divider sx={{ width: '50%', my: 2 }} />
                <Typography variant="body2">
                  {member.bio}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          رؤيتنا
        </Typography>
        <Typography variant="body1" paragraph>
          نسعى لأن نكون الخيار الأول للأفراد والشركات في مجال العقارات، من خلال توفير منصة موثوقة وشاملة تلبي جميع احتياجاتهم العقارية.
        </Typography>

        <Typography variant="h5" gutterBottom>
          قيمنا
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" paragraph>
            <strong>الشفافية:</strong> نؤمن بأهمية الوضوح والصدق في جميع تعاملاتنا.
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>الابتكار:</strong> نسعى دائمًا لتقديم حلول مبتكرة تجعل تجربة مستخدمينا أفضل.
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>التميز:</strong> نلتزم بتقديم خدمات عالية الجودة تفوق توقعات عملائنا.
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>خدمة العملاء:</strong> نضع رضا العملاء في مقدمة أولوياتنا ونسعى جاهدين لتلبية احتياجاتهم.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
