
let levels = []
let lvls = [{
    mainword: "ويفقطرة",
    word1: "فوق",
},
{
    mainword: "شاحنىثة",
    word1: "شاحنة",

},
{
    mainword: "وصولثيق",
    word1: "وصول",

}, {
    mainword: "خرتيتبح",
    word1: "خرتيت",
    word2: "حرب"


}, {
    mainword: "جطبمدخل",
    word1: "مدخل",
    word2: "مطبخ"

}, {
    mainword: "مرتفعسو",
    word1: "مرتفع",
    word2: "سور",

}, {
    mainword: "احسابصو",
    word1: "حساب",
    word2: "صاحب",
},
{
    mainword: "عنوانلي",
    word1: "عنوان",

}, {
    mainword: "عنوانلي",
    word1: "عنوان",

}, {
    mainword: "نتيجةوه",
    word1: "نتيجة",
    word2: "وجه",
}, {
    mainword: "تجهيزات",
    word1: "تجهيزات",
}, {
    mainword: "اقراصلة",
    word1: "اقراص",
    word2: "لصقة"
}, {
    mainword: "تواضعرس",
    word1: "تواضع",
    word2: "وتر"
}, {
    mainword: "البخيلق",
    word1: "بخيل",
    word2: "خيل"
}, {
    mainword: "تشريحثى",
    word1: "تشريح",
    word2: "ريش"
}, {
    mainword: "مراكزوش",
    word1: "مراكز",
    word2: "شكر"
}, {
    mainword: "جيوشلعء",
    word1: "جيوش",
    word2: "شيء"
}, {
    mainword: "غصونثيم",
    word1: "غصون",

}, {
    mainword: "شيةاعرس",
    word1: "شاعر",
    word2: "عرش"

}, {
    mainword: "حيعوان",
    word1: "حيوان",
    word2: "نوع"

}, {
    mainword: "غمضسالك",
    word1: "مسالك",


}, {
    mainword: "غنيمةقل",
    word1: "غنيمة",


}, {
    mainword: "عفمائقر",
    word1: "عمائر",
    word2: "عرف"


}, {
    mainword: "غفلهامة",
    word1: "هامة",
    word2: "غفلة"

}, {
    mainword: "بوسيلةج",
    word1: "وسيلة",
    word2: "وجبة"

}, {
    mainword: "ماصلسنع",
    word1: "مصنع"
}, { mainword: "مكلسابر", word1: "ملابس" }, { mainword: "مطتبوخق", word1: "مطبخ" }, {
    mainword: "متصقفبح",
    word1: "متصفح"
}, { mainword: "معالجوة", word1: "معالجة" },]

lvls.forEach((l, index) => {
    let answerVariants = []
    for (let index = 0; index < 5; index++) {
        if (l[`word${index + 1}`]) {
            answerVariants.push(l[`word${index + 1}`])
        }

    }
    levels.push([[l.mainword], answerVariants])

})
