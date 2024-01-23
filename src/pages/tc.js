import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { getWebsite } from '../api/Website';
import LandingLayout from '../layouts/LandingLayout';


export async function getServerSideProps() {
  const website = await getWebsite();

  return { props: { website: website.data } };
};

const Page = ({ website }) => {
  const { data } = useQuery({
    queryKey: ['getWebsite'],
    queryFn: getWebsite,
    initialData: website,
  });

  const {
    terms_and_conditions
  } = data?.data?.contact ?? {};

  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>

      <Box sx={{ my: 10, }}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Terms and Conditions
        </Typography>
        <Box sx={{ my: 3, mx: 5, direction: 'rtl' }}>
          <Typography variant='h5'>
            باستخدامك واشتراكك بالتطبيق الخاص بــ” iCenna” كمستخدم مريض ("المنصة/منصات/منصاتنا")، فإنك توافق دون قيد أو شرط على الالتزام قانوناً بالشروط والأحكام أدناه ("شروط الاستخدام") من تاريخ الاشتراك ("تاريخ السريان") بين:
          </Typography>
          <ul>
            <Typography variant='h6' component='li'>
              شركة "افي سينا لتقنية المعلومات" ذات السجل التجاري رقم /4030497928/ (ويشار إليها ههنا بــــ"مزود الخدمة" و/أو "نحن").
            </Typography>
            <Typography variant='h6' component='li'>
              لمستخدم المريض، (أو "المريض" أو "أنت" أو "انتِ") هو أي شخص يستخدم البرنامج لحجز مواعيد مع المرفق الطبي (ويشار إليه ههنا بــــ"المستخدم").
            </Typography>
          </ul>
          <ol style={{ marginTop: 4 }}>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                المصطلحات والتعريفات
              </Typography>
              <Typography variant='h6' component='span'>
                يكون للمصطلحات التالية المعاني المحددة إزاء كل منها ما لم يرد خلاف ذلك بشكل صريح في النص:
              </Typography>
              <ol>
                <Typography variant='h6' component='li'>
                  "مزود الخدمة" يكون لها المعنى المنصوص عليه في المقدمة.
                </Typography>
                <Typography variant='h6' component='li'>
                  "المستخدم" يكون له المعنى المنصوص عليه في المقدمة                </Typography>
                <Typography variant='h6' component='li'>
                  "تاريخ السريان" يكون له المعنى المنصوص عليه في المقدمة.                </Typography>
                <Typography variant='h6' component='li'>
                  "الأحكام والشروط" أي هذه الاحكام والشروط، كما هو منصوص عليه في المقدمة.                </Typography>
                <Typography variant='h6' component='li'>
                  "البرنامج" أي برنامج مزود الخدمة (iCenna).
                </Typography>
                <Typography variant='h6' component='li'>
                  "مدة الاشتراك" هي مدة الاشتراك في البرنامج.
                </Typography>
                <Typography variant='h6' component='li'>
                  "طلب الاشتراك" هو الطلب الأولي الذي يقدمه المستخدم للاشتراك في البرنامج لأول مرة.
                </Typography>
                <Typography variant='h6' component='li'>
                  "الصيانة العاجلة غير المجدولة" هي حالة الصيانة الطارئة العاجلة غير المجدولة التي يقوم بها مزود الخدمة.
                </Typography>
                <Typography variant='h6' component='li'>
                  "المنصة" تشمل الموقع الالكتروني والتطبيق الخاص بالبرنامج.
                </Typography>
                <Typography variant='h6' component='li'>
                  "شركة التأمين" هي شركة التأمين التعاوني المرخص لها بالعمل في المملكة والتي تم تأهيلها لممارسة أعمال الضمان الصحي التعاوني.
                </Typography>
                <Typography variant='h6' component='li'>
                  "الوثيقة" وثائق الضمان الصحي التعاوني الأساسية التي أقرها المجلس والتي تتضمن التحديدات والمنافع والاستثناءات والشروط العامة وتصدرها شركة التأمين بموجب طلب تأمين يقدم من صاحب العمل حامل الوثيقة أو المؤمن له.
                </Typography>
                <Typography variant='h6' component='li'>
                  "التاريخ الطبي" هو معلومات وتفاصيل متعلقة بتاريخ صحة المريض، بما في ذلك الزيارات الطبية السابقة، والتشخيصات، والأدوية المستخدمة، والإجراءات الطبية، ونتائج الفحوصات الطبية، وتاريخ العلاج والتدخلات الجراحية، والتاريخ العائلي للأمراض، والحساسيات والتحسينات الصحية الأخرى ذات الصلة. يتم استخدام التاريخ الطبي لتتبع ومراقبة حالة المريض واتخاذ قرارات طبية.
                </Typography>
                <Typography variant='h6' component='li'>
                  "المرفق الصحي" هو المرفق الصحي المؤهل بتقديم الخدمات الصحية وفقا للأنظمة والقواعد ذات المرعية الاجراء، وعلى سبيل المثال لا الحصر مستشفى، مجمع طبي عام، مجمع طبي متخصص، مركز تشخيص، عيادة، صيدلية، مختبر، مركز علاج طبيعي أو مركز علاج بالإشعاع والأطباء والممرضين.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              البرنامج
              <ol>
                <Typography variant='h6' component='li'>
                  ان iCenna برنامج وسيط بينك وبين المرفق الصحي من اجل اتمتة وتسهيل حجز المواعيد الطبية ودفعها، والحفاظ على تاريخك الطبي. ويجب عليك التسجيل والموافقة على استخدام وكشف بياناتك الشخصية اللازمة والطبية لنا من أجل الاستفادة من الخدمة والمشاركة بشكل كامل، وذلك وفقًا لسياسة الخصوصية الخاصة بنا.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              الاهلية للتسجيل بالبرنامج
              <ol>
                <Typography variant='h6' component='li'>
                  باستخدامك للبرنامج تقر بأنك متمتع بالأهلية القانونية والشرعية للتعاقد، وأنك اتممت السن القانونية. إذا كان عمرك أقل من 18 سنة، فلن يسمح لك بالتسجيل معنا أو استخدام المنصة.
                </Typography>
                <Typography variant='h6' component='li'>
                  إذا كنت والدًا أو وصيًا قانونيًا لطفل قاصر دون 18 عامًا، فيمكنك استخدام المنصة والخدمات بالنيابة عنه. وباستخدامك للمنصة والخدمات بالنيابة عن طفل قاصر، فإنك تقر وتضمن أنك مسؤول عنه وأنك تمتلك السلطة القانونية والشرعية اللازمة للقيام بذلك.
                </Typography>
                <Typography variant='h6' component='li'>
                  إذا لم تكن مؤهلًا وفقًا لهذه الشروط، فلا تستخدم المنصة والخدمات. وسيتم إبطال عضويتك وحق وصولك للمنصة خدماتها. باستخدامك للمنصة، فإنك تقر وتضمن أنك مؤهل وتمتلك السلطة والقدرة للالتزام بالشروط والأحكام.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              التسجيل بالبرنامج:
              <ol>
                <Typography variant='h6' component='li'>
                  كجزء من عملية التسجيل ومن أجل حجز مواعيدك الطبية وتحديث ومراجعة تاريخك الطبي، ستحتاج إلى تقديم اسمك، وعنوانك، وعنوان بريدك الإلكتروني الخاص ورقم الهاتف المحمول، بالإضافة إلى تزويدنا برقم الهوية الوطنية أو رقم الإقامة، بالإضافة إلى معلوماتك الشخصية والصحية، والتاريخ الطبي والاجتماعي، والاحتياجات الطبية الحالية، وأي معلومات أخرى ذات صلة قد نطلبها، أو بطلبها المرفق الصحي، منك من وقت لآخر.
                </Typography>
                <Typography variant='h6' component='li'>
                  بتقديم البيانات السالفة الذكر في المادة (2.2.1)، فإنك توافق على استخدامها من قبل المنصة الإلكترونية وفريقها، وتمنحنا بموجب ذلك إذنًا لمشاركة هذه البيانات مع المرفق الصحي والأشخاص الثالثين (third-parties).
                </Typography>
                <Typography variant='h6' component='li'>
                  يجب عليك الحفاظ على سرية بيانات التسجيل الخاصة بك وعدم مشاركتها مع أي شخص آخر.
                </Typography>
                <Typography variant='h6' component='li'>
                  تكون المسؤول الوحيد عن إخطارنا في حالة سرقة أو اختراق الحساب الخاصة بك. يمكنك إبلاغنا عن طريق إرسال بريد إلكتروني إلىinfo@iCenna.com  لاتخاذ الإجراءات اللازمة.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              تسديد الكشوفات الطبية وتكاليف العلاج
              <ol>
                <Typography variant='h6' component='li'>
                  يتيح لك البرنامج خاصية تسديد كشوفاتك الطبية وتكاليف العلاج لتسهيل واتمتة عملية الدفع. ويمكنك اختيار إجراء الدفع باستخدام البطاقة الإلكترونية (فيزا او ماستر كارد أو مدى)، أو خدمة Apple Pay، أو خدمة STC Pay، أو بالدفع نقدًا عند مقدم الخدمة المختار. وعند الدفع، سيتم تخزين المبلغ المدفوع في حسابك حتى تتمكن من الاستفادة من الخدمة المطلوبة.
                </Typography>
                <Typography variant='h6' component='li'>
                  يتم إعادة المبلغ المدفوع بالكامل في حال أردت إلغاء الحجز قبل موعدك الطبي.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                التأمين
              </Typography>
              <Typography variant='h6' component='span'>
                لتوفير خيارات تأمين للمرضى، نقوم بالتعاون مع شركات التأمين، مما يتيح لك الاستفادة من وثيقة التأمين الصحي عبر البرنامج، إن وجدت. ومع ذلك، يجب عليك مراعاة أننا لن نتحمل المسؤولية في حال عدم تغطية شركة التأمين لحالتك المرضية أو في حالة انتهاء فترة وثيقة التأمين. في مثل هذه الحالات، يتوجب عليك تحمل تكاليف العلاج والعناية الصحية بشكل ذاتي، ولن نقوم بتغطية هذه التكاليف.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              حماية البيانات وسياسة الخصوصية
              <ol>
                <Typography variant='h6' component='li'>
                  تعتبر سياسة الخصوصية الخاصة، والتي قد يتم تغييرها من وقت لآخر، جزءاً لا يتجزأ من هذه الأحكام والشروط، والتي يمكن مراجعتها من خلال الرابط أدناه: https://iCenna.com/privacy.
                </Typography>
                <Typography variant='h6' component='li'>
                  نحن نهتم بأمان بياناتك الشخصية ونعمل على حمايتها، لذا يجب عليك اتباع مبادئ الأمان وعدم مشاركة معلومات تسجيل الدخول الخاصة بك مع أي شخص آخر. إذا كان لديك أي استفسارات أو مخاوف بخصوص أمان بياناتك، يرجى عدم التردد في الاتصال بنا عبر البريد الإلكتروني المذكور أعلاه.
                </Typography>
                <Typography variant='h6' component='li'>
                  نقوم بحماية معلوماتك الشخصية الممنوحة لنا، لاسيما معلوماتك الطبية والصحية التي نقوم بحفظها بحسب القوانين المرعية الاجراء وبحسب سياسة الخصوصية المذكورة أعلاه.
                </Typography>
                <Typography variant='h6' component='li'>
                  إنك توافق من أجل توفير خدماتنا، لاسيما حرية تنقلك من مرفق صحي لاخر أو استخدامك للبرنامج لدى أكثر من مرفق صحي، على أننا نقوم بحفظ البيانات التي يزودنا بها أي مرفق صحي تتعامل معه. وتسري على هذه البيانات الشروط عينها التي تسري على البيانات التي نقوم بجمعها منك، ولا نقوم بحذفها اذا قام بذلك المرفق الصحي وذلك من أجل توفير خدماتنا لك.
                </Typography>
                <Typography variant='h6' component='li'>
                  قد نحتاج إلى معالجة البيانات الشخصية من أجل:
                  <ol>
                    <Typography variant='h6' component='li'>
                      توفير الخدمات الخاصة بالبرنامج؛
                    </Typography>
                    <Typography variant='h6' component='li'>
                      إدارة البرنامج وتوفيره؛
                    </Typography>
                    <Typography variant='h6' component='li'>
                      طلب البرنامج وترخيصه؛
                    </Typography>
                    <Typography variant='h6' component='li'>
                      تجميع وإرسال وإدارة دفع الفواتير المتعلقة بالبرنامج؛
                    </Typography>
                    <Typography variant='h6' component='li'>
                      إدارة العقد وحل أي نزاعات تتعلق به؛
                    </Typography>
                    <Typography variant='h6' component='li'>
                      الرد و/أو إثارة الاستفسارات العامة المتعلقة بالبرنامج؛ و
                    </Typography>
                    <Typography variant='h6' component='li'>
                      الامتثال للالتزامات القانونية الخاصة بالاتفاقية.
                    </Typography>
                  </ol>
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              بند تحديد المسؤولية
              <ol>
                <Typography variant='h6' component='li'>
                  iCenna ليست طبيبا:
                </Typography>
                <ol>
                  <Typography variant='h6' component='li'>
                    ان iCenna برنامج وسيط بينك وبين المرفق الصحي من اجل اتمتة وتسهيل حجز المواعيد الطبية ودفعها، والحفاظ على تاريخك الطبي. وبالتالي فإننا نؤكد أننا لسنا مرفق صحي أو أطباء ولا نقدم أي خدمة صحية أو طبية.
                  </Typography>
                  <Typography variant='h6' component='li'>
                    إن جميع المعلومات التي تحصلون عليها من خلالنا، بما في ذلك الموظفين والمتعاقدين وغيرهم، هي لأغراض الجدولة فقط. ولا تهدف إلى أن تكون بديلاً عن المشورة الطبية أو التشخيص أو العلاج. ولا ننصح بتجاهل أو تجنب أو تأخير الحصول على المشورة الطبية من المرفق الصحي المؤهل بسبب أي معلومة قد تكون قرأتها على البرنامج.
                  </Typography>
                  <Typography variant='h6' component='li'>
                    عليك أن تدرك أن استخدام المعلومات المقدمة على البرنامج هو على مسؤوليتك الخاصة. ولا يجب أن تفهم أي معلومة أو نص أو محتوى موجود على البرنامج على أنها مشورة طبية أو توفير للرعاية الطبية.
                  </Typography>
                  <Typography variant='h6' component='li'>
                    لا نقوم بأي مراجعة أو مصادقة على أي من الاستشارات المقدمة من المرفق الصحي أو آراء أطباءه، أو توصياتهم والتي قد تظهر على البرنامج. ولا نتحمل أي مسؤولية ناشئة عن ذلك. وإذا قررت الاعتماد على أي من المعلومات المقدمة على البرنامج، فيجب عليك فعل ذلك على مسؤوليتك الخاصة.
                  </Typography>
                </ol>
                <Typography variant='h6' component='li'>
                  باستثناء أي مسؤولية أخرى لا يجوز استبعادها بموجب القانون، فإننا لا نتحمل بأي حال من الأحوال أي مسؤولية عن أي خسائر أو أضرار قد تتكبدها، سواء تم تكبدها بشكل مباشر أو غير مباشر، أو كانت فورية أو تبعية، وسواء أكانت ناشئةً عن مسؤولية تعاقدية أو تقصيرية (بما في ذلك حالة الإهمال)، والتي تندرج– على سبيل المثال لا الحصر ضمن الاضرار الناجمة عن العمل الطبي أو الاستشفائي سواء بشكل مباشر أو غير مباشر.
                </Typography>
                <Typography variant='h6' component='li'>
                  تقر بمسؤوليتك الكاملة عن أي أخطاء تقوم بها بمعرض إدخالك أو استعمالك للمعلومات والبيانات الخاصة بك. وتقر بأننا لا نقوم بأي مراجعة أو تدقيق لتلك المعلومات والبيانات، ولا نتحمل أي مسؤولية تعاقدية أو تقصيرية تنشأ بسبب عدم تحققك من تلك المعلومات والبيانات.
                </Typography>
                <Typography variant='h6' component='li'>
                  عند استخدامك المنصة الإلكترونية والخدمات لحجز مواعيد مع الأطباء، نقدم لك قائمة من الأطباء ومقدمي الخدمة الذين قد يكونوا مناسبين لتقديم الرعاية الصحية التي تبحث عنها، استنادًا فقط إلى المعلومات التي تقدمها لنا. ومن ثم، يمكنك اختيار الطبيب أو مقدم الخدمة الذي يلبي احتياجاتك. إلا أننا لا نوصي بأي طبيب أو مرفق طبي معين. كما أننا لا نقدم أي ضمانات بخصوص نوعية الخدمة المقدمة من قبل هؤلاء الأطباء أو المرافق الطبية.
                </Typography>
                <Typography variant='h6' component='li'>
                  نحن غير مسؤولين تجاهك، أو تجاه أي طرف ثالث، عن أي أضرار مباشرة أو غير مباشرة، أو خاصة، أو عرضية، أو تبعية، أو تحذيرية، ناتجة عن استخدامك للمنصة والبرنامج. وينطبق هذا على مطالبات فقد البيانات، أو ضياع السمعة، أو توقف العمل، أو أي أضرار أخرى. كما لا نتحمل أي مسؤولية عن سوء الممارسة الطبية أو الإهمال من قبل الأطباء باستخدام البرنامج، حتى إذا كنا على علم بحدوث أو إمكانية حدوث مثل هذه الأضرار.
                </Typography>
                <Typography variant='h6' component='li'>
                  عليك أن تتأكد من أن الأطباء مقدمي الخدمات الطبية المتاحين على البرنامج لديهم تراخيص طبية نشطة، وللتأكد من ذلك يمكنك التواصل مع وزارة الصحة.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              الضمانات
              <ol>
                <Typography variant='h6' component='li'>
                  نضمن ونمثل ونتعهد بالتالي:
                  <ol>
                    <Typography variant='h6' component='li'>
                      الامتثال لجميع القوانين والتشريعات واللوائح الحكومية المعمول بها.
                    </Typography>
                    <Typography variant='h6' component='li'>
                      بأن البرنامج مناسباً للغرض الذي أعد من أجله وأنه، وليس لحاجات المستخدم الفردية، وأنه ذات جودة مرضية.
                    </Typography>
                  </ol>
                </Typography>
                <Typography variant='h6' component='li'>
                  لا نضمن بأن استخدام البرنامج سيكون دون انقطاع أو خالياً من الأخطاء أو أنه سيلبي أي متطلبات عالية للأمن السيبراني.
                </Typography>
                <Typography variant='h6' component='li'>
                  تقر بمسؤوليك الكاملة عن اختيار البرنامج لتحقيق النتائج المقصودة، وتقر بأن البرنامج لم يتم تطويره لتلبية متطلباتك الفردية.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              الغاء/ تجميد الحساب
              <ol>
                <Typography variant='h6' component='li'>
                  يحق لك إلغاء حسابك في أي وقت عبر الدخول إلى حسابك على المنصة الإلكترونية واتباع الإجراءات المحددة لإلغاء الحساب.
                </Typography>
                <Typography variant='h6' component='li'>
                  نحتفظ بالحق في تجميد حسابك في حالة عدم التقيد بالأحكام والشروط المحددة. وفي حالة اكتشاف أي مخالفة للأحكام والشروط، يمكننا تجميد حسابك دون إشعار مسبق. يجب على المستخدمين الالتزام بجميع الأحكام والشروط المحددة هنا، والامتناع عن أي استخدام غير قانوني أو غير مشروع.
                </Typography>
              </ol>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                القوانين المطبقة والاختصاص القضائي
              </Typography>
              <Typography variant='h6' component='span'>
                تخضع هذه الاحكام والشروط وتفسر وفقاً لقوانين المملكة العربية السعودية. وأي منازعة أو خلاف أو مطالبة تنشأ عنها أو تتعلق بها، أو عن الإخلال بها أو إنهائها أو بطلانها، تكون من اختصاص محاكم المملكة العربية السعودية التجارية، على أن يتم تحديد محكمة الاختصاص وفقاً للقوانين والتشريعات النافذة في المملكة العربية السعودية.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                بند قابلية التجزئة
              </Typography>
              <Typography variant='h6' component='span'>
                لا يؤثر بطلان أو عدم شرعية أو عدم قابلية تنفيذ أي من مواد هذه الاحكام والشروط على استمرار نفاذ ما تبقى منها.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                القوة القاهرة
              </Typography>
              <Typography variant='h6' component='span'>
                لسنا مسؤولين بأي شكل عن الاخفاق أو التأخير في أداء التزاماتنا إذا كان هذا التأخير أو الاخفاق ناتجاً عن أحداث أو ظروف أو أسباب خارجة عن سيطرتنا بفعل القوة القاهرة.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                الاخطارات
              </Typography>
              <Typography variant='h6' component='span'>
                أي إخطار من قبلك لنا يتم تقديمه كتابياً عبر البريد الإلكتروني إلى العنوان التالي support@iCenna.com. ويتم إخطارك كتابياً إلى بريدك الإلكتروني الموجود في طلب الاشتراك.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                الاختصاص القضائي والقانون الواجب التطبيق
              </Typography>
              <Typography variant='h6' component='span'>
                أي منازعة أو خلاف أو مطالبة تنشأ عن هذه الاتفاقية أو تتعلق بها، أو عن الإخلال بها أو إنهائها أو بطلانها، تسوى عن طريق التحكيم ويديرها المركز السعودي للتحكيم التجاري وفق قواعد التحكيم لديه، ووفقاً للقوانين المعمول بها في المملكة العربية السعودية.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                بند الاتفاق الكلي
              </Typography>
              <Typography variant='h6' component='span'>
                تعتبر هذه الاتفاقية إلى جانب وثيقة الخصوصية الاتفاق الكلي والوحيد بين الاطراف، وتلغي وتحل محل أية اتفاقيات سابقة لها أو متزامنة معها، وأية عمليات تمثيل أو ضمانات تخص البرنامج، أو محتوياته أو الخدمات الواردة فيه أو من خلاله، أو تخص محتوى هذه الاتفاقية بشكل عام.
              </Typography>
            </Typography>
            <Typography variant='h6' component='li' sx={{ fontWeight: 'bold' }}>
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold', display: 'block' }}>
                التحديث الدوري لهذه الشروط والأحكام
              </Typography>
              <Typography variant='h6' component='span'>
                قد يتم تعديل هذه الشروط والأحكام في أي وقت حسب تقديرنا. وإذا تم إجراء أي تغيير في هذه الشروط والأحكام، سنقوم بنشر النسخة المحدثة على المنصة. باستمرار استخدامك للمنصة و/أو الخدمة بعد التعديل، يعتبر ذلك موافقة منك على هذه الشروط والأحكام المعدلة.
              </Typography>
            </Typography>
          </ol>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => {
  const { website } = page.props;

  return (
    <LandingLayout website={website?.data}>
      {page}
    </LandingLayout>
  );
};

Page.authGuard = false;

export default Page;
