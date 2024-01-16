import { Box, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { getWebsite } from '../api/Website';
import LandingLayout from '../layouts/LandingLayout';

export async function getServerSideProps() {
    const website = await getWebsite();

    return { props: { website: website.data } };
};

const Index = ({ website }) => {
    return (
        <>
            <Head>
                <title>Privacy</title>
            </Head>
            <Box sx={{ my: 3, }}>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                    سياسة الخصوصية
                </Typography>
                <Box sx={{ my: 3, mx: 5, direction: 'rtl' }}>
                    <Typography variant='h5'>
                        نلتزم في iCenna باحترام خصوصيتك وحماية معلوماتك الشخصية. يمكنك الاطلاع على سياسة الخصوصية الكاملة أدناه لمساعدتك في فهم كيفية استخدامنا لمعلوماتك الشخصية.
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        ما هي المعلومات التي نجمعها عند استخدامك لموقعنا؟
                    </Typography>
                    <Typography variant='h6'>
                        ستخدم تقنيات متنوعة لجمع المعلومات تلقائياً - مثل عنوان IP الخاص بك، لنتمكن من التحقق من المشاكل التي قد تواجهك، مثل عدم توفر الخدمة وتحديد الاستخدام الضار.
                    </Typography>
                    <Typography variant='h6' >
                        نقوم أيضًا بجمع بعض معلوماتك الشخصية مباشرةً - على سبيل المثال، عندما تقوم بإرسال تفاصيل مثل موقعك الحالي عبر الـGPS للعثور على الخدمات القريبة منك. ونقوم تحديداً بجمع التالي (على سبيل المثال لا الحصر):
                    </Typography>
                    {/* List */}
                    <ul>
                        <Typography variant='h6' component='li'>
                            عنوان بريد إلكتروني.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            ورقم الهاتف المحمول.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            رقم الهوية الوطنية آو رقم الإقامة.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            معلوماتك الصحية.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            البيانات الشخصية الحساسة. وإننا نحاول الحد من الظروف التي نجمع فيها "البيانات الشخصية الحساسة" ونعالجها ، ولكننا نضطر لجمع ذلك واستخدامه بسبب طبيعة البرنامج وخدماته؛
                        </Typography>
                        <Typography variant='h6' component='li'>
                            معلومات حول الخدمات التي قدمناها لك في الماضي؛
                        </Typography>
                        <Typography variant='h6' component='li'>
                            معلومات حول التسجيل الإلكتروني والتفاعلات الأخرى؛
                        </Typography>
                    </ul>
                    <Typography variant='h6' >
                        وبالإضافة إلى ذلك، قد نتلقى معلومات شخصية عنك من أطراف ثالثة، (على سبيل المثال لا الحصر):
                    </Typography>
                    <ul>
                        <Typography variant='h6' component='li'>
                            الشركات والمستشفيات التي نتعاقد معها لتقديم الخدمات لك.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            الشركات والمستشفيات المشاركة في البرنامج.
                        </Typography>
                    </ul>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        ما هو الهدف من جمع واستخدام معلوماتك؟
                    </Typography>
                    <Typography variant='h6'>
                        نستخدم المعلومات التي تزودنا بها لتقديم الخدمات التي قمت بطلبها وتعزيز تجربتك معنا. كما نستخدم هذه المعلومات لتساعدنا على فهمك بصورة أفضل حتى نستطيع تقديم ما يلائمك من عروض، وإرسال التحديثات، وتقديم خدمات مصممة خصيصاً لتناسب متطلباتك وإضفاء طابع شخصي أكثر عند التعامل معك، وإجراء تحليلات وأبحاث السوق، والقيام بالأعمال التسويقية بما في ذلك الإعلانات على الإنترنت وإبقائك على علم بخدماتنا، والقيام بإعلانات موجهة على الإنترنت، وتحسين مواقعنا الإلكترونية وخدماتنا، ولأغراض أخرى تنظيمية وإدارية.
                    </Typography>
                    <Typography variant='h6'>
                        في حال أبلغتنا أنك لا تريد تلقي أي رسائل تسويقية، سنوقف إرسالها. وبالطبع، سنواصل إرسال المعلومات الأساسية المتعلقة بالمنتجات أو الخدمات التي قمت بالاشتراك بها.
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        متى نجمع المعلومات الشخصية عنك؟
                    </Typography>
                    <Typography variant='h6'>
                        نجمع معلومات شخصية بأي وقت تستخدم فيه خدماتنا (سواءً كانت هذه الخدمات مقدمة من قبلنا أو من قبل شركات أخرى)، ويشمل ذلك استخدام موقعنا الإلكتروني أو تطبيقات الهاتف المحمول الخاصة بنا.
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        ما هو الأساس القانوني لاستخدام معلوماتك الشخصية؟
                    </Typography>
                    <Typography variant='h6'>
                        نعالج معلوماتك الشخصية فقط عندما يكون لدينا أساس قانوني للقيام بذلك. يكون الأساس القانوني في أغلب الحالات التالي:
                    </Typography>
                    <ul>
                        <Typography variant='h6' component='li'>
                            لأننا نحتاج لاستخدام معلوماتك لتزويدك بخدماتنا وتحسينها؛
                        </Typography>
                        <Typography variant='h6' component='li'>
                            لحماية مصالحك الحيوية أو المصالح الحيوية لغيرك؛
                        </Typography>
                        <Typography variant='h6' component='li'>
                            لموافقتك على أن استخدام معلوماتك لغرض معين. وفي حال كان الأساس القانوني لمعالجتنا لبياناتك هو الموافقة على التسويق، فيمكنك سحب موافقتك على مثل هذه المعالجة في أي وقت، سواءً عن طريق إدخال تعديل على حسابك على الإنترنت أو بدلًا من ذلك عن طريق التواصل معنا على <a href="mailto:info@Icenna.com" target="_blank">info@Icenna.com</a>. إلا أنه في حال أنك سحبت موافقتك الكاملة، في بعض الحالات، قد يعني ذلك أننا لن يكون باستطاعتنا تقديم كل الخدمات التي قمت بطلبها منا أو أجزاء منها؛
                        </Typography>
                        <Typography variant='h6' component='li'>
                            للمصلحة التجارية المشروعة لاستخدام المعلومات الشخصية التي نجمعها لتقديم خدمة فعالة وتسيير أعمالنا؛
                        </Typography>
                        <Typography variant='h6' component='li'>
                            للالتزام بالقوانين المرعية الاجراء.
                        </Typography>
                    </ul>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        كم من الوقت نحتفظ بالمعلومات الشخصية؟
                    </Typography>
                    <Typography variant='h6'>
                        سنحتفظ بمعلوماتك الشخصية طالما ما زلنا بحاجة لها من أجل الغرض التي تتم معالجتها من أجله. وسنحتفظ بالمعلومات لفترة تسمح لنا بالتعامل مع أي شكاوى، أو استفسارات أو مخاوف متعلقة بالحجز أو الاستجابة لها. قد يتم الاحتفاظ بالمعلومات أيضًا حتى نستطيع الاستمرار في تحسين تجربتك معنا ولضمان حصولك على أية مكافآت ولاء مستحقة لصالحك.
                    </Typography>
                    <Typography variant='h6'>
                        سنراجع بصورة نشطة المعلومات التي نحتفظ بها وسنحذفها بطريقة آمنة، أو في بعض الحالات سنخفي هوية صاحبها، حين لا تكون هناك حاجة قانونية أو تجارية أو متعلقة بالعملاء للاحتفاظ بها لمدة أطول. إذا توقفت عن التفاعل معنا، سنحذف معلوماتك أو نخفي هوية صاحبها بعد 7 سنوات.
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        مع من نشارك معلوماتك الشخصية؟
                    </Typography>
                    <Typography variant='h6'>
                        يجوز أيضًا أن نكشف عن معلوماتك الشخصية للأطراف الثالثة التالية للأغراض الموضحة فيما يلي:
                    </Typography>
                    <ul>
                        <Typography variant='h6' component='li'>
                            شركات بطاقات الائتمان والدفع، ووكالات التصنيف الائتماني، ومقدمي خدمات التحري لمكافحة الاحتيال لمعالجة المدفوعات و(عند الضرورة) لإجراء اختبار خطر الاحتيال.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            رداً على طلب قانوني صحيح من الحكومة ووكالات إنفاذ القانون.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            أطراف ثالثة من مقدمي الخدمات الذين نستخدمهم لتقديم خدمات تشتمل على معالجة البيانات.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            أطراف ثالثة، مثل شركات المحاماة والمحاكم القانونية لإنفاذ أو تطبيق أي عقد بيننا وبينك.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            أطراف ثالثة، مثل الشرطة والسلطات التنظيمية، لحماية حقوقنا أو ممتلكاتنا أو حفظ سلامة عملائنا وموظفينا والأصول المملوكة لنا.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            يجوز أن نقدم معلومات الاستخدام (ولكن ليس بياناتك الشخصية) للمواقع الإلكترونية الأخرى حتى يعلموا أنك قد قمت بزيارة موقعنا الإلكتروني كما هو مبين في كيفية استخدام ملفات الارتباط (الكوكيز).
                        </Typography>
                        <Typography variant='h6' component='li'>
                            يجوز أن نقدم معلومات الاستخدام والتي تشمل بياناتك الشخصية إلى وكالات التسويق لتقديم الإعلانات على الإنترنت على المواقع الإلكترونية أو شبكات التواصل الاجتماعي.
                        </Typography>
                    </ul>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        ما هي حقوقك القانونية فيما يتعلق بالمعلومات الشخصية التي نحتفظ بها عنك؟
                    </Typography>
                    <Typography variant='h6'>
                        بموجب القوانين المرعية الاجراء، فإنك تتمتع بحقوق معينة فيما يتعلق بمعلوماتك الشخصية.
                    </Typography>
                    <Typography variant='h6'>
                        تشمل حقوقك ما يلي:
                    </Typography>
                    <ul>
                        <Typography variant='h6' component='li'>
                            الحق بإتلاف بياناتك الشخصية.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            يجوز لك أن تطلب منا إيقاف إرسال الرسائل التسويقية إليك، بما في ذلك التحليلات لأغراض التسويق الموجه والتي تشمل الإعلانات عبر الإنترنت.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            يجوز لك أن تطلب منا إيقاف استخدام بياناتك الشخصية حيث نستخدمها في إطار مصالحنا المشروعة، ما لم تكن هناك حاجة لهذه المعلومات من أجل التعامل مع الدعاوى القانونية أو تكن لدينا غير ذلك من الأسباب المشروعة.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            بإمكانك الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك.
                        </Typography>
                        <Typography variant='h6' component='li'>
                            يجوز لك أن تطلب منا تصحيح معلوماتك الشخصية ("حق التصحيح") إذا كانت تلك المعلومات غير دقيقة.
                        </Typography>
                    </ul>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        كيف نستخدم ملفات الارتباط؟
                    </Typography>
                    <Typography variant='h6'>
                        نستخدم ملفات تعريف الارتباط، وهي ملفات صغيرة يتم حفظها على هاتفك المحمول أو عند زيارتك لمواقعنا حيث تقوم بتخزين معلومات حول كيفية استخدامك للموقع. ونستخدم ملفات الارتباط هذه لأسباب تقنية لإتاحة عملنا وبرنامجنا، وسهولة الاستخدام، والتتبع، والتسويق.
                    </Typography>
                    <Typography variant='h6'>
                        بكل الأحوال، فإننا نحتاج إلى إذنك قبل أن نتمكن من استخدام ملفات الارتباط. إذا أردت تعطيل عمل ملفات الارتباط ستحتاج لتغيير إعدادات الموقع الإلكتروني الخاصة بك في المتصفح ليرفض ملفات الارتباط.
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        كيف يمكنك ممارسة حقوقك القانونية وتغيير كيفية استخدامنا لبياناتك؟
                    </Typography>
                    <Typography variant='h6'>
                        إذا كنت ترغب في تغيير كيفية استخدامنا لمعلوماتك الشخصية، من فضلك اتصل بنا عبر: <a href="mailto:info@Icenna.com" target="_blank">info@Icenna.com</a>.
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 5, mb: 3, fontWeight: 'bold' }}>
                        التعديلات
                    </Typography>
                    <Typography variant='h6'>
                        إذا قمنا بتغيير سياسة الخصوصية هذه، سنطلعك على التغييرات من خلال نشر النسخة الأحدث على موقعنا.
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

Index.getLayout = (page) => {
    const { website } = page.props;

    return (
        <LandingLayout website={website?.data}>
            {page}
        </LandingLayout>
    );
};

Index.authGuard = false;

export default Index;
