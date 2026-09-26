import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Statistics Chapter 0 — Data and Its Pictures.
 * Statistics exists because measurements vary. Sort data by type, organise
 * raw values into frequency tables, and draw honest pictures of them:
 * histograms (area = frequency), ogives, and the tricks that mislead.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** Heights (cm) of 30 students in one class. */
const HEIGHTS = [
  148, 151, 152, 154, 155, 155, 156, 157, 158, 158, 159, 160, 160, 160, 161, 162, 162, 163, 164, 165, 165, 166, 167,
  168, 169, 170, 172, 174, 177, 183,
];

/** One person's commute (minutes) on 22 working days. */
const COMMUTE = [24, 25, 26, 26, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 30, 30, 31, 32, 33, 35, 38, 47];

/** 40 test marks (out of 60) — the running example of 0.3 and 0.4. */
const MARKS = [
  21, 30, 33, 18, 38, 44, 39, 48, 29, 26, 17, 15, 27, 45, 28, 35, 32, 34, 41, 46, 35, 28, 38, 37, 42, 58, 36, 23, 24, 33,
  51, 55, 12, 19, 43, 36, 25, 47, 53, 31,
];

/** Weights (kg) of 50 students: classes 40–45 … 65–70 with f = 4, 9, 15, 12, 7, 3. */
const WEIGHTS = [
  41, 42, 43, 44, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 51, 52, 52, 52, 53, 53, 53, 54, 54, 54, 54, 55, 55,
  56, 56, 57, 57, 57, 58, 58, 58, 59, 59, 60, 61, 61, 62, 63, 63, 64, 65, 67, 69,
];

/** Two clusters that a wide class width can hide. */
const WAITS = [
  14, 16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 22, 22, 23, 24, 26, 34, 36, 37, 38, 38, 39, 39, 40, 40, 40, 41, 41, 42,
  43, 44, 46,
];

const lesson01: LessonSeed = {
  slug: "why-statistics-exists",
  title: "0.1 · Why Statistics Exists",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/st-0-data-and-its-pictures.mp4",
      poster: "/videos/st-0-data-and-its-pictures.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Measure the height of every student in your class. Thirty students, thirty numbers, and very few of them agree. Now time your trip to school every day for a month. Same route, same bus, same person, and the clock still reads 26 minutes one day, 31 the next and 47 on the day it rained.",
    },
    {
      type: "text",
      content:
        "If everything came out the same every time, one measurement would tell you everything and there would be no subject called statistics. **Statistics exists because things vary.** Its job is to describe that variation honestly: where the values tend to sit, how widely they spread, and what shape the whole pile makes.",
    },
    {
      type: "text",
      content:
        "Here are the 30 heights, one dot per student, stacked where values repeat. Look at the *pile*, not at any single dot.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: HEIGHTS,
        range: { min: 140, max: 190 },
        xLabel: "Height (cm)",
        view: "dotplot",
        stats: [],
        caption:
          "Each dot is one student. Drag a dot, tap an empty spot to add a student, or select one and remove it. Individual dots move, but the pile keeps its shape: crowded in the middle, thin at the edges.",
      },
    },
    {
      type: "text",
      content:
        "Try adding ten more students with ordinary heights. The new dots almost always land in the crowded middle, and the shape barely changes. That is the surprising fact at the heart of the subject: **individual values are unpredictable, but the pattern of many values is stable.** You cannot say how tall the next student will be, but you can say with confidence that most students will be between about 150 and 175 cm.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Distribution",
      content:
        "The **distribution** of a set of data is the pattern of which values occur and how often. The dot plot above is a picture of a distribution. Almost everything in this course is a way of describing a distribution: its centre, its spread and its shape.",
    },
    {
      type: "text",
      content: "The same thing happens with one person's commute over 22 working days:",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: COMMUTE,
        range: { min: 20, max: 50 },
        xLabel: "Commute time (minutes)",
        view: "dotplot",
        stats: [],
        editable: false,
        caption:
          "Most days take 26 to 31 minutes. A few slow days trail off to the right, and one rainy day took 47 minutes.",
      },
    },
    {
      type: "text",
      content:
        "Notice what the picture says that no single number could. The usual trip is about half an hour, bad days can take a quarter of an hour or more extra, and nobody ever got there in 15. If you had measured only once and called that number 'the commute time', you would be throwing all of that away.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Variation is not a mistake",
      content:
        "It is tempting to think each quantity has one true value and the spread around it is sloppy measurement. Sometimes measurement error is part of it, but the heights in your class really *are* different, and the traffic really *is* different each day. The spread is information about the world. Throwing it away to keep one tidy number is the most common way to misunderstand data.",
    },
    {
      type: "quiz",
      id: "st0-1-q1",
      variant: "concept",
      question:
        "A student records her commute on 22 days and gets values from 24 to 47 minutes. Her friend says: 'Only one of those is the real commute time; the rest are errors.' What is wrong with this?",
      options: [
        {
          text: "The commute genuinely changes from day to day; the spread describes something real about the trip.",
          correct: true,
          feedback:
            "Exactly. Traffic, weather and waiting times really vary. A planner who ignores that will be late on the bad days.",
        },
        {
          text: "Nothing: the smallest value, 24 minutes, is the true time and the others are delays caused by errors.",
          feedback:
            "The 24-minute day was a particularly lucky day, not 'the truth'. Planning on it would make her late most days.",
        },
        {
          text: "Nothing: the true time is the one that occurred most often, and the others should be discarded.",
          feedback:
            "The most common value is a useful summary (you will meet it as the mode), but the other days still happened. Discarding them hides how bad a bad day can be.",
        },
      ],
    },
    {
      type: "text",
      content:
        "The heights came from *one* class. Suppose you really want to know about the heights of all Class 11 students in India. You cannot measure all of them, so you measure some and reason from those to the rest. Four words carry that idea, and you will use them for the rest of the course.",
    },
    {
      type: "table",
      headers: ["Word", "Meaning", "Heights example"],
      rows: [
        ["Population", "The whole group you want to know about", "All Class 11 students in India"],
        ["Sample", "The part of the population you actually measure", "The 30 students in your class"],
        ["Parameter", "A number describing the population (usually unknown)", "The average height of all Class 11 students"],
        ["Statistic", "A number calculated from the sample (known)", "The average height of your 30 classmates"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "A memory hook",
      content:
        "**P**arameter goes with **P**opulation, **S**tatistic goes with **S**ample. A statistic is something you compute; a parameter is something you would like to know. Chapter 5 shows how a statistic can estimate a parameter and how far off it is likely to be.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A company wants to know what fraction of its 20 000 customers are happy. It emails 500 of them, and 410 reply 'happy'.\n\n**Step 1.** The population is all 20 000 customers, because that is the group the company wants to know about.\n\n**Step 2.** The sample is the 500 customers who were emailed.\n\n**Step 3.** The statistic is the sample fraction $\\frac{410}{500} = 0.82$, which is known.\n\n**Step 4.** The parameter is the fraction of all 20 000 customers who are happy. It is unknown. The company hopes it is close to 0.82.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A quality inspector opens 20 packets from a batch of 5000 biscuit packets and weighs each one. The population is the 5000 packets, the sample is the 20 opened packets, the average weight of the 20 is a statistic, and the average weight of all 5000 is a parameter. Notice that the inspector *cannot* measure the whole population here, because every packet she weighs is opened and cannot be sold. That is one of the main reasons samples exist.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (census or sample?).** Every ten years the Census of India visits *every* household and records how many people live there. A school principal, on the other hand, wants to know how many hours her 1500 students spend on homework, so she asks 100 of them.\n\n**Step 1.** The Census measures the whole population. *Why this step:* when every member is measured, the number you compute *is* the parameter, with no guessing involved. That is what the word **census** means.\n\n**Step 2.** The principal measures 100 of 1500 students, a **sample**. Her average of those 100 answers is a statistic, and she uses it to estimate the parameter, the average for all 1500.\n\n**Step 3.** Why not always take a census? A census of 140 crore people takes years and thousands of crores of rupees. For most questions a well-chosen sample of a few hundred gives an answer that is close enough, far sooner and far more cheaply.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** *A state board wants to know the average number of hours of sleep of its 2 lakh Class 12 students. An officer visits one residential school, asks the 60 boarders there, and finds an average of 6.4 hours. (a) Name the population, sample, statistic and parameter. (b) Comment on whether 6.4 hours is likely to be a good estimate.*\n\n**Step 1.** Population: all 2 lakh Class 12 students of the state. *Why:* the population is fixed by the question being asked, not by who was actually measured.\n\n**Step 2.** Sample: the 60 boarders who were asked.\n\n**Step 3.** Statistic: 6.4 hours, the average of the sample. Parameter: the average hours of sleep of all 2 lakh students, which is unknown.\n\n**Step 4.** Is 6.4 a good estimate? Probably not. All 60 students come from **one** school with a fixed hostel timetable, so their sleep is likely to differ from that of day scholars in other towns. *Why this matters:* a sample is only useful if it resembles the population. Taking more students from the same hostel would not fix this; taking students from many schools would. Choosing samples fairly is part of the subject too.",
    },
    {
      type: "quiz",
      id: "st0-1-q2",
      variant: "practice",
      question:
        "A news channel surveys 1200 voters in a state with 5 crore voters and reports that 46% of the people surveyed support a new policy. What is the 46%?",
      options: [
        {
          text: "A statistic, because it is calculated from the 1200 people in the sample.",
          correct: true,
          feedback: "Right. It is computed from the sample and it is known exactly.",
        },
        {
          text: "A parameter, because it describes voters.",
          feedback:
            "The parameter would be the percentage among all 5 crore voters, which nobody knows. The 46% comes from the 1200 surveyed.",
        },
        {
          text: "The population, because it is about the whole state.",
          feedback: "A population is a group of people or objects, not a number. Here it is the 5 crore voters.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-1-q3",
      variant: "practice",
      question: "In the same survey, what is the population?",
      options: [
        { text: "All 5 crore voters in the state", correct: true, feedback: "That is the group the channel wants to describe." },
        { text: "The 1200 voters surveyed", feedback: "Those people are the sample." },
        { text: "The 46% who support the policy", feedback: "That is a number calculated from the sample, not a group." },
      ],
    },
    {
      type: "quiz",
      id: "st0-1-q6",
      variant: "concept",
      question:
        "A teacher enters the marks of **all 42 students** in her own section and finds their average, 61. She wants to describe only her section. Is 61 a statistic or a parameter?",
      options: [
        {
          text: "A parameter: her section is the whole population she cares about, and she measured all of it.",
          correct: true,
          feedback:
            "Right. Whether a number is a statistic or a parameter depends on the population in the question. Here every member was measured (a census), so 61 is the parameter itself.",
        },
        {
          text: "A statistic, because 42 students is a small group.",
          feedback: "Size is not the test. A population can be small. What matters is whether the group measured is the whole group being described.",
        },
        {
          text: "A statistic, because any average worked out from data is a statistic.",
          feedback:
            "An average worked out from a *sample* is a statistic. If the same 42 students were used to estimate all Class 11 students in the city, then 61 would be a statistic.",
        },
      ],
      hint: "First decide what the population is.",
    },
    {
      type: "quiz",
      id: "st0-1-q7",
      variant: "practice",
      question:
        "To estimate how much time the 3000 students of a college spend in the library each week, a researcher asks the 50 students she meets inside the library one evening. What is the main weakness of this sample?",
      options: [
        {
          text: "Students found inside the library are likely to use it more than typical students, so the estimate will probably be too high.",
          correct: true,
          feedback:
            "The sample is chosen in a way that favours heavy library users, just like the hostel-only sleep survey. A sample must resemble the population.",
        },
        {
          text: "50 is too few; with 500 students from the same library the estimate would be fine.",
          feedback: "More students chosen the same way would share the same bias. The fault lies in *how* they were chosen, not how many.",
        },
        {
          text: "There is no weakness; any 50 students form a fair sample.",
          feedback: "Students met inside the library are not 'any' students. People who never go to the library could not be chosen at all.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-1-q4",
      variant: "practice",
      question:
        "You add 20 more students of ordinary height to the dot plot of 30 heights. What is most likely to happen to the shape of the pile?",
      options: [
        {
          text: "It keeps roughly the same shape, just taller: crowded in the middle and thin at the edges.",
          correct: true,
          feedback:
            "Individual heights are unpredictable, but the pattern of many heights is stable. More data makes the shape clearer, not different.",
        },
        {
          text: "It becomes flat, because more data spreads out evenly.",
          feedback: "New typical students land where typical students already are, in the middle.",
        },
        {
          text: "It changes completely, because each new student is random.",
          feedback: "Each student is unpredictable, but the collection is not. That stability is what makes statistics possible.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-1-q5",
      variant: "concept",
      question: "Why would a factory test a *sample* of light bulbs for lifetime instead of testing every bulb?",
      options: [
        {
          text: "Testing a bulb's lifetime means burning it out, so testing every bulb would leave nothing to sell.",
          correct: true,
          feedback: "When measuring destroys the item, a sample is the only option. Cost and time are other common reasons.",
        },
        {
          text: "A sample always gives exactly the same answer as the whole population.",
          feedback:
            "A sample only gives an estimate, and different samples give slightly different answers. That sampling variation is studied in Chapter 5.",
        },
        {
          text: "Bulbs in the population do not vary, so one sample is enough.",
          feedback: "If they did not vary there would be nothing to measure. Lifetimes vary a lot from bulb to bulb.",
        },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "kinds-of-data",
  title: "0.2 · Kinds of Data",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Before drawing or averaging anything, ask one question: **what kind of data is this?** The answer decides which pictures make sense and which summaries mean anything. You can average heights, but you cannot average blood groups, and a 'mean pin code' is nonsense even though a calculator will happily produce one.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Categorical data",
      content:
        "**Categorical** (qualitative) data puts each individual into a group or category: blood group, favourite sport, state of birth, pin code. The values are labels. Some categories have a natural order (grades A, B, C; 'agree, neutral, disagree'), which is called *ordinal* data; others have none (blood group), which is called *nominal* data.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Numerical data",
      content:
        "**Numerical** (quantitative) data records an amount or a count, so arithmetic on it makes sense: height, marks, number of siblings, time taken. A good test is to ask whether 'twice as much' or 'the difference between two values' means something.",
    },
    {
      type: "text",
      content: "Numerical data splits once more, according to which values are possible.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Discrete and continuous",
      content:
        "**Discrete** data can take only separate values, usually counts: number of siblings (0, 1, 2, …), goals in a match, shoe size (7, 8, 9, or half sizes, but nothing in between).\n**Continuous** data can take any value in an interval, limited only by how precisely you measure: height, weight, time, temperature. A height recorded as 162 cm really means 'somewhere between 161.5 and 162.5 cm'.",
    },
    {
      type: "table",
      headers: ["Type", "Examples", "Sensible pictures", "Sensible summaries"],
      rows: [
        ["Categorical, nominal", "blood group, pin code, favourite subject", "bar chart, pie chart", "counts, percentages, most common category"],
        ["Categorical, ordinal", "grades A1, A2, B1; 'disagree / neutral / agree'", "bar chart (in order), pie chart", "counts, percentages, most common category, and the median category (but not a mean)"],
        ["Numerical, discrete", "number of siblings, goals, shoe size", "dot plot, bar-line chart, frequency table", "mean, median, spread"],
        ["Numerical, continuous", "height, weight, time", "histogram, ogive, dot plot", "mean, median, spread (from grouped classes)"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example.** Classify each column of a class register.\n\n**Roll number.** Written in digits, but ask whether arithmetic makes sense. Roll number 24 is not 'twice' roll number 12; the numbers are only labels. **Categorical.**\n\n**Number of siblings.** A count, so arithmetic is meaningful and only whole numbers are possible. **Numerical, discrete.**\n\n**Height.** Any value in a range is possible if you measure finely enough. **Numerical, continuous.**\n\n**Grade in Maths (A1, A2, B1, …).** Labels with a natural order. **Categorical (ordinal).**\n\n**Marks out of 80.** Marks come in whole (or half) steps, so they are usually treated as **numerical, discrete**. When there are many possible values, we often group them into classes and draw them like continuous data. That is a choice about the picture, not a change in the data.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Digits do not make data numerical",
      content:
        "Pin codes, phone numbers, roll numbers and jersey numbers are written in digits but are labels. The mean of three pin codes is a number that corresponds to no place and means nothing. Always ask whether arithmetic on the values means something, not whether they look like numbers.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a hospital admission form).** Classify each field, asking the same two questions every time: *does arithmetic on it mean anything?* and, if so, *can it take in-between values?*\n\n**Patient ID (e.g. 204417).** Adding two IDs is meaningless; the ID only names a patient. **Categorical, nominal.**\n\n**Ward number (3, 7, 12).** Ward 12 is not 'four times' ward 3. **Categorical, nominal.** *Why this step:* digits again, but they are labels, just like pin codes.\n\n**Pain level (mild / moderate / severe).** Labels with a natural order, but the gaps between them are not measured amounts. **Categorical, ordinal.**\n\n**Number of previous admissions (0, 1, 2, …).** A count, so only whole numbers. **Numerical, discrete.**\n\n**Body temperature (°C).** It could be 37.2, 37.25 or 37.248; the thermometer just rounds it. **Numerical, continuous.**\n\n**Age (recorded in completed years).** The form shows whole numbers, but age itself flows continuously: someone recorded as 16 could be 16 years and 11 months old. **Numerical, continuous**, recorded to the nearest year. *Why this matters:* the recording is rounded, not the quantity. The same is true of height recorded to the nearest centimetre.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (CBSE style).** *Classify each as categorical, discrete or continuous: (i) the number of letters in each word of a sentence; (ii) the weights of newborn babies in a hospital; (iii) the number of accidents on a highway each day; (iv) the time between two buses at a stop; (v) the marital status of employees.*\n\n**(i)** Letters are counted, 3, 5, 7, never 4.6. **Discrete.**\n\n**(ii)** Weight can be any value in an interval, such as 2.85 kg. **Continuous.**\n\n**(iii)** Accidents are counted. **Discrete.** *Why:* even an *average* of 2.4 accidents a day does not make the data continuous; each single day's count is still a whole number.\n\n**(iv)** Time can be measured as finely as you like. **Continuous.**\n\n**(v)** Single / married / divorced / widowed are labels with no order. **Categorical (nominal).**",
    },
    {
      type: "quiz",
      id: "st0-2-q1",
      variant: "concept",
      question: "A survey records each respondent's six-digit pin code. What kind of data is this?",
      options: [
        {
          text: "Categorical: a pin code labels a postal area, and arithmetic on it is meaningless.",
          correct: true,
          feedback: "Right. 560001 is not 'more' than 110001 in any useful sense. The digits are a name.",
        },
        {
          text: "Numerical, discrete: pin codes are whole numbers.",
          feedback: "Being made of digits is not the test. Would the average of two pin codes mean anything? It would not.",
        },
        {
          text: "Numerical, continuous: pin codes can be very large numbers.",
          feedback: "Size has nothing to do with it, and pin codes are labels, not amounts.",
        },
      ],
      hint: "Ask whether the mean of a few pin codes would mean anything.",
    },
    {
      type: "quiz",
      id: "st0-2-q2",
      variant: "practice",
      question: "The time a student takes to finish a 100 m race is",
      options: [
        {
          text: "numerical, continuous",
          correct: true,
          feedback: "Time can take any value in an interval; the stopwatch's precision only limits how you record it.",
        },
        { text: "numerical, discrete", feedback: "A stopwatch shows 13.42 s, but the true time could be anything near that. Time is continuous." },
        { text: "categorical", feedback: "Times are amounts, and differences between them mean something." },
      ],
    },
    {
      type: "quiz",
      id: "st0-2-q3",
      variant: "practice",
      question: "Shoe size (sold as 6, 6½, 7, 7½, …) is best described as",
      options: [
        {
          text: "numerical, discrete",
          correct: true,
          feedback: "Only certain separate sizes exist; there is no size 7.23. Feet are continuous, but shoe sizes are not.",
        },
        {
          text: "numerical, continuous",
          feedback: "Foot length is continuous, but the size printed on a shoe comes only in fixed steps.",
        },
        { text: "categorical, nominal", feedback: "Sizes are ordered and a size 9 is bigger than a size 7, so they carry amounts." },
      ],
    },
    {
      type: "quiz",
      id: "st0-2-q4",
      variant: "practice",
      question: "Blood group (A, B, AB, O) is",
      options: [
        { text: "categorical, with no natural order (nominal)", correct: true, feedback: "They are labels with no order. The right summary is counts or percentages." },
        { text: "categorical, with a natural order (ordinal)", feedback: "There is no sense in which group B is 'more' than group A." },
        { text: "numerical, discrete", feedback: "You cannot add or average blood groups." },
      ],
    },
    {
      type: "quiz",
      id: "st0-2-q5",
      variant: "practice",
      question:
        "Which summary makes sense for the favourite subjects of 40 students (Maths, Physics, Chemistry, Biology, English)?",
      options: [
        {
          text: "The most common subject and the percentage choosing each subject",
          correct: true,
          feedback: "For categorical data you can count and compare categories, and that is all you need.",
        },
        {
          text: "The mean subject, after coding Maths = 1, Physics = 2, and so on",
          feedback: "The codes are arbitrary labels. Reorder them and the 'mean' changes, which shows it means nothing.",
        },
        {
          text: "A histogram of the subjects",
          feedback: "A histogram needs a numerical axis. Categorical data gets a bar chart or pie chart.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-2-q6",
      variant: "practice",
      question:
        "A survey asks students to answer Strongly disagree / Disagree / Neutral / Agree / Strongly agree. These answers are",
      options: [
        {
          text: "categorical, ordinal",
          correct: true,
          feedback:
            "They are labels with a natural order. You can report the most common answer or the median answer, but not a meaningful mean.",
        },
        {
          text: "categorical, nominal",
          feedback: "Unlike blood groups, these answers do have an order: 'Agree' is further along than 'Neutral'.",
        },
        {
          text: "numerical, discrete, since they can be coded 1 to 5",
          feedback:
            "Coding them 1–5 does not make the gaps equal. Nobody can say that 'Strongly agree' is exactly one step beyond 'Agree' in the way 5 is one more than 4.",
        },
      ],
      hint: "Is there an order? And are the gaps between answers measurable amounts?",
    },
    {
      type: "quiz",
      id: "st0-2-q7",
      variant: "practice",
      question: "Which one of these is **continuous** data?",
      options: [
        {
          text: "The rainfall (in mm) recorded at a weather station each day",
          correct: true,
          feedback: "Rainfall is an amount that can be any value in an interval, such as 12.35 mm. The gauge only limits the precision.",
        },
        { text: "The number of rooms in each house on a street", feedback: "Rooms are counted in whole numbers, so this is discrete." },
        { text: "The number of matches a team wins each season", feedback: "Wins are counted, so this is discrete." },
        { text: "The ward number of each patient", feedback: "Ward numbers are labels, so this is categorical." },
      ],
    },
    {
      type: "quiz",
      id: "st0-2-q8",
      variant: "concept",
      question:
        "A form records each child's age in completed years (5, 6, 7, …). A student says: 'The values are whole numbers, so age is discrete.' What is the best reply?",
      options: [
        {
          text: "Age itself is continuous; it has only been rounded down to whole years when it was recorded.",
          correct: true,
          feedback:
            "A child recorded as 6 may be 6 years and 8 months old. Rounding when you record a value does not change what kind of quantity it is.",
        },
        {
          text: "The student is right: anything written as a whole number is discrete.",
          feedback: "Heights written to the nearest cm are whole numbers too, yet height is continuous. Ask what values the quantity itself can take.",
        },
        {
          text: "Age is categorical, because each year is a separate group.",
          feedback: "Differences in age are meaningful amounts (a 10-year-old is 4 years older than a 6-year-old), so age is numerical.",
        },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "frequency-tables-and-class-intervals",
  title: "0.3 · Frequency Tables and Class Intervals",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Here are the marks (out of 60) of 40 students, in the order the teacher entered them:\n\n21, 30, 33, 18, 38, 44, 39, 48, 29, 26, 17, 15, 27, 45, 28, 35, 32, 34, 41, 46, 35, 28, 38, 37, 42, 58, 36, 23, 24, 33, 51, 55, 12, 19, 43, 36, 25, 47, 53, 31\n\nWhat is the typical mark? Did many students struggle? It is hard to say. Raw data hides its own shape, and the first job is to organise it.",
    },
    {
      type: "text",
      content:
        "**Step 1: an ungrouped (discrete) frequency table.** List each distinct value with its frequency, the number of times it occurs. With marks from 12 to 58 that gives about 35 rows, most with frequency 1 or 2. That is more organised but still does not show a shape, because there are too many rows.",
    },
    {
      type: "text",
      content:
        "An ungrouped table works well when the data has only a few distinct values. **Worked example.** Twenty students report their number of siblings: 1, 0, 2, 1, 1, 3, 2, 0, 1, 2, 4, 1, 2, 1, 0, 3, 2, 1, 2, 1. Count how often each value $x$ occurs:",
    },
    {
      type: "table",
      headers: ["Number of siblings $x$", "Frequency $f$"],
      rows: [
        ["0", "3"],
        ["1", "8"],
        ["2", "6"],
        ["3", "2"],
        ["4", "1"],
        ["Total", "20"],
      ],
    },
    {
      type: "text",
      content:
        "Check: $3 + 8 + 6 + 2 + 1 = 20$. Now the shape is visible at once: one sibling is most common, and large families are rare. Tables like this, a column of values $x$ with a column of frequencies $f$, are exactly what Chapter 1 uses to compute a mean or a median of discrete data.",
    },
    {
      type: "quiz",
      id: "st0-3-q7",
      variant: "practice",
      question: "From the siblings table, how many students have **at least 2** siblings?",
      options: [
        { text: "9", correct: true, feedback: "'At least 2' means 2, 3 or 4 siblings: $6 + 2 + 1 = 9$." },
        { text: "6", feedback: "6 students have exactly 2 siblings. 'At least 2' also includes 3 and 4." },
        { text: "3", feedback: "That counts only 3 or 4 siblings. 'At least 2' includes 2 itself." },
        { text: "17", feedback: "17 students have at least 1 sibling. Leave out the 8 with exactly one as well." },
      ],
      hint: "Add the frequencies for $x = 2, 3, 4$.",
    },
    {
      type: "text",
      content:
        "**Step 2: group the values into classes.** Choose intervals of 10 marks: 10–19, 20–29, …, 50–59. Go through the list once and make a tally mark in the right row for each value, drawing every fifth tally as a stroke across the previous four ($\\cancel{||||}$) so the tallies can be counted in fives.",
    },
    {
      type: "table",
      headers: ["Class (marks)", "Tally", "Frequency $f$"],
      rows: [
        ["10–19", "$\\cancel{||||}$", "5"],
        ["20–29", "$\\cancel{||||}$ ||||", "9"],
        ["30–39", "$\\cancel{||||}$ $\\cancel{||||}$ ||||", "14"],
        ["40–49", "$\\cancel{||||}$ |||", "8"],
        ["50–59", "||||", "4"],
        ["Total", "", "40"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 3: check.** The frequencies must add to the number of data values: $5 + 9 + 14 + 8 + 4 = 40$. Now the shape is visible. Most students scored in the 30s, fewer in the 20s and 40s, and a few at each extreme. Grouping loses the individual values but reveals the pattern.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: MARKS,
        range: { min: 9.5, max: 59.5 },
        xLabel: "Marks",
        view: "dotplot",
        views: ["dotplot", "histogram"],
        binWidth: 10,
        binStart: 9.5,
        stats: [],
        editable: false,
        caption:
          "The same 40 marks as individual dots and as classes of width 10. Switch views: the histogram's bars are the frequencies from the table. Bars are drawn on the class boundaries 9.5, 19.5, …, 59.5, as explained below.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "The vocabulary of a class",
      content:
        "For a class such as 20–29:\n**Class limits** are the numbers written in the table: lower limit 20, upper limit 29.\n**Class boundaries** are where one class really ends and the next begins: 19.5 and 29.5 (worked out below).\n**Class width** (class size) is upper boundary minus lower boundary: $29.5 - 19.5 = 10$.\n**Class mark** (midpoint) is the centre of the class: $\\frac{20 + 29}{2} = 24.5$, which is also $\\frac{19.5 + 29.5}{2}$.\n**Relative frequency** is $\\frac{f}{n}$, the fraction of all data in the class: $\\frac{9}{40} = 0.225$.",
    },
    {
      type: "text",
      content:
        "**Inclusive and exclusive classes.** The table above uses *inclusive* classes: 10–19 includes both 10 and 19. That works for whole-number marks. The other style is *exclusive* classes, 10–20, 20–30, 30–40, where the upper limit is **not** included, so a mark of exactly 20 goes into 20–30. Exclusive classes are the norm for continuous data like height and weight, because a class must be able to hold values such as 19.7.",
    },
    {
      type: "text",
      content:
        "**Why inclusive classes need boundaries.** Look at 10–19 and 20–29 on a number line. There is a gap between 19 and 20. For whole-number marks no value falls in that gap, but a histogram is drawn on a continuous axis, and its bars must touch. Split the gap evenly: the boundary between the classes is $\\frac{19 + 20}{2} = 19.5$. In general:",
    },
    {
      type: "math",
      latex:
        "\\text{adjustment} = \\frac{(\\text{lower limit of next class}) - (\\text{upper limit of this class})}{2} = \\frac{20 - 19}{2} = 0.5",
    },
    {
      type: "text",
      content:
        "Subtract the adjustment from every lower limit and add it to every upper limit. 10–19 becomes 9.5–19.5, 20–29 becomes 19.5–29.5, and so on. The classes now meet with no gap and no overlap, and every width is 10.",
    },
    {
      type: "table",
      headers: ["Class", "Boundaries", "Class mark", "Width", "$f$", "Relative frequency $f/n$"],
      rows: [
        ["10–19", "9.5–19.5", "14.5", "10", "5", "0.125"],
        ["20–29", "19.5–29.5", "24.5", "10", "9", "0.225"],
        ["30–39", "29.5–39.5", "34.5", "10", "14", "0.35"],
        ["40–49", "39.5–49.5", "44.5", "10", "8", "0.2"],
        ["50–59", "49.5–59.5", "54.5", "10", "4", "0.1"],
        ["Total", "", "", "", "40", "1"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "10–19 and 20–29 are not touching",
      content:
        "Written as limits, the classes leave a gap from 19 to 20. On a continuous scale a value like 19.7 would have nowhere to go, and a histogram drawn from the limits would have gaps between the bars. Convert to boundaries (9.5–19.5, 19.5–29.5) before drawing anything or using any formula that needs the width or the lower edge of a class.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Weights (kg) are grouped as 30–34, 35–39, 40–44, 45–49. Find the boundaries, width and class mark of 35–39.\n\n**Step 1.** The gap between classes is $35 - 34 = 1$, so the adjustment is $0.5$.\n\n**Step 2.** Boundaries: $35 - 0.5 = 34.5$ and $39 + 0.5 = 39.5$.\n\n**Step 3.** Width: $39.5 - 34.5 = 5$. A common slip is $39 - 35 = 4$; that measures the limits, not the class.\n\n**Step 4.** Class mark: $\\frac{35 + 39}{2} = 37$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Choosing a class width",
      content:
        "Aim for roughly 5 to 10 classes. Too few and every class looks alike; too many and you are back to a jagged list. A convenient recipe: width $\\approx \\frac{\\text{largest} - \\text{smallest}}{\\text{number of classes}}$, rounded to a friendly number. The top line is the **range** of the data, largest minus smallest; for the marks it is $58 - 12 = 46$. So $\\frac{46}{5} = 9.2$, and we take width 10. Start the first class at a round number at or below the smallest value.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (building a table from scratch).** Twenty-four students record how many minutes they spent on their phones before school:\n\n12, 35, 47, 28, 19, 55, 33, 41, 26, 38, 8, 44, 31, 22, 50, 36, 17, 29, 42, 39, 24, 58, 33, 46\n\n**Step 1: find the range.** Smallest 8, largest 58, so the range is $58 - 8 = 50$.\n\n**Step 2: choose the classes.** $\\frac{50}{6} \\approx 8.3$, so take width 10 and start at 0: six classes 0–10, 10–20, …, 50–60. *Why exclusive classes:* time is continuous, so the classes must meet with no gaps. The rule is that each upper limit is left out.\n\n**Step 3: tally.** Go through the list **once**, in the given order, putting a tally in the right row for each value. *Why once through the list, not class by class:* scanning the list six times, once per class, is how values get missed or counted twice. Watch the value 50: with exclusive classes it belongs to 50–60, not 40–50.",
    },
    {
      type: "table",
      headers: ["Minutes", "Tally", "$f$", "Relative frequency"],
      rows: [
        ["0–10", "|", "1", "$\\frac{1}{24} \\approx 0.042$"],
        ["10–20", "|||", "3", "$0.125$"],
        ["20–30", "$\\cancel{||||}$", "5", "$\\approx 0.208$"],
        ["30–40", "$\\cancel{||||}$ ||", "7", "$\\approx 0.292$"],
        ["40–50", "$\\cancel{||||}$", "5", "$\\approx 0.208$"],
        ["50–60", "|||", "3", "$0.125$"],
        ["Total", "", "24", "1"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 4: check and read.** $1 + 3 + 5 + 7 + 5 + 3 = 24$, so every student has been counted exactly once. The shape is a single hump centred on 30–40 minutes and roughly symmetric, which was impossible to see in the raw list. Also, $7 + 5 + 3 = 15$ of the 24 students (62.5%) spent at least half an hour on their phones.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style: missing frequencies).** *A distribution of 50 values has classes 0–10, 10–20, 20–30, 30–40, 40–50 with frequencies 7, $a$, 15, $b$, 8. The relative frequency of the class 10–20 is 0.2. Find $a$ and $b$.*\n\n**Step 1: use the relative frequency.** Relative frequency $= \\frac{f}{n}$, so $\\frac{a}{50} = 0.2$, giving $a = 10$. *Why start here:* this equation has only one unknown, while the total involves both.\n\n**Step 2: use the total.** The frequencies add to $n$:",
    },
    {
      type: "math",
      latex: "7 + 10 + 15 + b + 8 = 50 \\implies 40 + b = 50 \\implies b = 10",
    },
    {
      type: "text",
      content:
        "**Step 3: check.** $7 + 10 + 15 + 10 + 8 = 50$, and $\\frac{10}{50} = 0.2$ as given. Two unknowns need two facts: here one came from a relative frequency and one from the total. In other problems the second fact may be a given cumulative frequency, or a given mean (Chapter 1).",
    },
    {
      type: "quiz",
      id: "st0-3-q1",
      variant: "concept",
      question: "A table uses inclusive classes 10–19, 20–29, 30–39. What are the class boundaries of 20–29?",
      options: [
        { text: "19.5 and 29.5", correct: true, feedback: "The gap from 19 to 20 is split evenly, so each boundary moves out by 0.5." },
        {
          text: "20 and 29, since the classes already touch",
          feedback: "They do not touch: nothing covers the stretch from 29 to 30. Boundaries close that gap.",
        },
        { text: "20 and 30", feedback: "That treats the class as exclusive and shifts only one end. The correct boundaries are symmetric: 19.5 and 29.5." },
        { text: "19 and 30", feedback: "That overlaps the neighbouring classes. Each boundary should sit halfway across the gap." },
      ],
    },
    {
      type: "quiz",
      id: "st0-3-q2",
      variant: "practice",
      question: "In the marks table, what is the relative frequency of the class 30–39?",
      options: [
        { text: "$0.35$", correct: true, feedback: "$\\frac{14}{40} = 0.35$, so 35% of the students scored in the 30s." },
        { text: "$0.14$", feedback: "That is the frequency 14 divided by 100. Divide by the total number of students, 40." },
        { text: "$14$", feedback: "14 is the frequency. Relative frequency divides by $n$." },
        { text: "$0.345$", feedback: "That looks like the class mark 34.5 divided by 100. Use $\\frac{f}{n}$." },
      ],
    },
    {
      type: "quiz",
      id: "st0-3-q3",
      variant: "practice",
      question: "With exclusive classes 10–20, 20–30, 30–40, into which class does the value 30 go?",
      options: [
        { text: "30–40", correct: true, feedback: "In exclusive classes the upper limit is not included, so 30 starts the next class." },
        { text: "20–30", feedback: "The upper limit is excluded in this convention, so 30 does not belong to 20–30." },
        { text: "Both, counted half in each", feedback: "Each value is counted exactly once, or the frequencies would not add up to $n$." },
      ],
    },
    {
      type: "quiz",
      id: "st0-3-q4",
      variant: "practice",
      question: "For the inclusive class 45–49, what are the class width and the class mark?",
      options: [
        {
          text: "Width 5, class mark 47",
          correct: true,
          feedback: "Boundaries 44.5–49.5 give width 5, and $\\frac{45 + 49}{2} = 47$.",
        },
        { text: "Width 4, class mark 47", feedback: "$49 - 45 = 4$ measures between limits. Use boundaries: $49.5 - 44.5 = 5$." },
        { text: "Width 5, class mark 47.5", feedback: "The midpoint of 44.5 and 49.5 is 47, not 47.5." },
      ],
      hint: "Convert to boundaries first.",
    },
    {
      type: "quiz",
      id: "st0-3-q5",
      variant: "practice",
      question: "The relative frequencies of five classes are 0.1, 0.25, 0.3, $k$ and 0.15. What is $k$?",
      options: [
        { text: "$0.2$", correct: true, feedback: "Relative frequencies add to 1: $1 - (0.1 + 0.25 + 0.3 + 0.15) = 1 - 0.8 = 0.2$." },
        { text: "$0.8$", feedback: "0.8 is the total of the other four classes. $k$ is what is left over." },
        { text: "It cannot be found without $n$", feedback: "Relative frequencies always sum to 1, so $n$ is not needed." },
      ],
    },
    {
      type: "quiz",
      id: "st0-3-q6",
      variant: "practice",
      question:
        "The class marks of a grouped table are 47, 52, 57, 62. Find the class width and the class boundaries of the first class.",
      options: [
        {
          text: "Width 5; boundaries 44.5–49.5",
          correct: true,
          feedback:
            "Consecutive class marks are one width apart: $52 - 47 = 5$. The first class runs half a width either side of its mark: $47 \\mp 2.5$, giving 44.5–49.5.",
        },
        {
          text: "Width 5; boundaries 47–52",
          feedback: "That uses the class marks as limits. A class mark is the centre of its class, so the class stretches 2.5 either side of 47.",
        },
        {
          text: "Width 10; boundaries 42–52",
          feedback: "The gap between neighbouring class marks is the whole width, 5, not half of it.",
        },
        {
          text: "Width 5; boundaries 45–49",
          feedback: "45–49 would be inclusive class limits. Boundaries sit halfway across the gaps: 44.5 and 49.5.",
        },
      ],
      hint: "The difference between neighbouring class marks is the class width.",
    },
    {
      type: "quiz",
      id: "st0-3-q8",
      variant: "practice",
      question:
        "In the phone-time table (0–10: 1, 10–20: 3, 20–30: 5, 30–40: 7, 40–50: 5, 50–60: 3), what fraction of the 24 students spent **less than 30 minutes**?",
      options: [
        {
          text: "$\\frac{3}{8}$",
          correct: true,
          feedback: "Less than 30 means the classes 0–10, 10–20 and 20–30: $1 + 3 + 5 = 9$, and $\\frac{9}{24} = \\frac{3}{8} = 0.375$.",
        },
        { text: "$\\frac{5}{8}$", feedback: "That is the fraction with *at least* 30 minutes: $\\frac{15}{24}$. You want the other part." },
        { text: "$\\frac{5}{24}$", feedback: "That is only the class 20–30. 'Less than 30' also includes 0–10 and 10–20." },
      ],
    },
    {
      type: "quiz",
      id: "st0-3-q9",
      variant: "practice",
      question:
        "A distribution of 40 values has frequencies 5, $a$, 12, $b$, 6 in five classes. The relative frequency of the second class is 0.25. What is $b$?",
      options: [
        {
          text: "7",
          correct: true,
          feedback: "$a = 0.25 \\times 40 = 10$. Then $5 + 10 + 12 + b + 6 = 40$ gives $33 + b = 40$, so $b = 7$.",
        },
        { text: "17", feedback: "That leaves out $a$. First find $a = 0.25 \\times 40 = 10$ and include it in the total." },
        { text: "10", feedback: "10 is $a$, from the relative frequency. Now use the total, 40, to find $b$." },
        { text: "12", feedback: "Check the sum: $5 + 10 + 12 + 12 + 6 = 45$, not 40." },
      ],
      hint: "Find $a$ from $\\frac{a}{40} = 0.25$ first, then use the total.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "histograms-area-is-frequency",
  title: "0.4 · Histograms: Area Is Frequency",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A frequency table is a list; a histogram makes it a picture. Over each class, on a continuous number line, stand a bar whose **area** shows how many values fall in that class. When all classes are equally wide, area and height tell the same story, so the height can simply be the frequency. The care comes when widths differ.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: MARKS,
        range: { min: 9.5, max: 59.5 },
        xLabel: "Marks",
        view: "histogram",
        views: ["histogram", "dotplot"],
        binWidth: 10,
        binStart: 9.5,
        binSlider: { min: 2, max: 25, step: 1 },
        stats: [],
        caption:
          "The 40 marks, with bars starting at the class boundary 9.5. Slide the class width. Very narrow classes make a jagged comb; very wide ones squash everything into two or three bars. A width near 10 shows the shape best.",
      },
    },
    {
      type: "text",
      content:
        "Watch the vertical scale as you slide. Doubling the width roughly doubles every bar's height, because each class now collects about twice as many values. The *shape* is what matters, and the bar heights are only meaningful relative to the width. Hold on to that: it is the whole reason for frequency density below.",
    },
    {
      type: "table",
      headers: ["", "Bar chart", "Histogram"],
      rows: [
        ["Data", "categorical or discrete", "numerical, grouped into classes"],
        ["Horizontal axis", "category labels, in any order", "a continuous number scale"],
        ["Gaps between bars", "yes, the categories are separate", "no, the classes meet at their boundaries"],
        ["What shows the count", "height", "area"],
      ],
    },
    {
      type: "math",
      latex: "\\text{frequency density} = \\frac{\\text{frequency}}{\\text{class width}}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Frequency density",
      content:
        "Frequency density is the number of values per unit of the horizontal axis, for example 'students per mark' or 'people per year of age'. In a histogram with unequal widths, bar height is the frequency density, so bar area is the frequency.",
    },
    {
      type: "text",
      content:
        "**Deriving it.** Imagine a clinic records the ages of 60 patients in classes 0–10, 10–20, 20–40, 40–70 and 70–80. The 40–70 class is three times as wide as 0–10. Of course it collects more people: it covers 30 years of ages instead of 10. If you draw heights equal to frequencies, the wide class looks crowded simply because it is wide.\n\nThe honest question is: how crowded is each class *per year of age*? Divide the frequency by the width. Then:",
    },
    {
      type: "math",
      latex:
        "\\text{area} = \\text{height} \\times \\text{width} = \\frac{f}{w} \\times w = f",
    },
    {
      type: "text",
      content:
        "The area of every bar is its frequency, whatever its width. Your eye judges area, so the picture now shows the truth.",
    },
    {
      type: "table",
      headers: ["Age (years)", "Frequency $f$", "Width $w$", "Frequency density $f/w$"],
      rows: [
        ["0–10", "12", "10", "1.2"],
        ["10–20", "8", "10", "0.8"],
        ["20–40", "16", "20", "0.8"],
        ["40–70", "18", "30", "0.6"],
        ["70–80", "6", "10", "0.6"],
        ["Total", "60", "", ""],
      ],
    },
    {
      type: "text",
      content:
        "**Reading the worked example.** By raw frequency, 40–70 (18 patients) looks like the busiest group. By density it is one of the *least* crowded, 0.6 patients per year, while the 0–10 class is the most crowded at 1.2 per year. Children are the densest group of patients; the 40–70 bar only had more people because it spans 30 years.",
    },
    {
      type: "text",
      content:
        "**Picture the two drawings.** Drawn with height = frequency, the 40–70 bar towers over the rest at 18, and it is also three times as wide, so it covers far more ink than its share of 18 out of 60. Drawn with height = frequency density, the same bar is the lowest in the chart (0.6), level with 70–80, while the narrow 0–10 bar stands twice as tall (1.2). The ink each bar uses is now in proportion to its number of patients.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The textbook's adjusted frequency",
      content:
        "NCERT draws unequal-width histograms by scaling each frequency to the narrowest class width: adjusted $f = \\frac{\\text{min width}}{w} \\times f$. For the clinic, the minimum width is 10, so the adjusted frequencies are $12, 8, \\frac{10}{20} \\times 16 = 8, \\frac{10}{30} \\times 18 = 6, 6$. That is just $10 \\times$ the frequency density, so the bars have exactly the same shape; only the numbers on the vertical axis change.",
    },
    {
      type: "quiz",
      id: "st0-4-q6",
      variant: "practice",
      question:
        "Classes have widths 10, 10 and 20 with frequencies 6, 9 and 14. Using the textbook method with minimum width 10, what is the adjusted frequency of the third class?",
      options: [
        {
          text: "7",
          correct: true,
          feedback: "Adjusted $f = \\frac{10}{20} \\times 14 = 7$. It equals $10 \\times$ the density $\\frac{14}{20} = 0.7$.",
        },
        { text: "14", feedback: "That is the raw frequency. The class is twice the minimum width, so scale it by $\\frac{10}{20}$." },
        { text: "28", feedback: "That multiplies by $\\frac{20}{10}$. A wider class must be scaled down, not up." },
        { text: "0.7", feedback: "0.7 is the frequency density. The adjusted frequency is scaled to the minimum width: $0.7 \\times 10 = 7$." },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 2: going backwards.** A histogram of travel times has a bar over 15–25 minutes with frequency density 2.4. How many people took 15 to 25 minutes?\n\n**Step 1.** Width $= 25 - 15 = 10$.\n\n**Step 2.** Frequency $=$ area $=$ density $\\times$ width $= 2.4 \\times 10 = 24$ people.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (reading part of a bar).** A shop's histogram shows how long customers stayed. The bars are: 0–5 min at density 2, 5–15 min at density 3.5, 15–30 min at density 2, and 30–60 min at density 0.5 (customers per minute). (a) How many customers were recorded? (b) Estimate how many stayed between 10 and 20 minutes.\n\n**Step 1: turn every bar into a frequency.** Area = density × width:",
    },
    {
      type: "math",
      latex: "2 \\times 5 = 10, \\quad 3.5 \\times 10 = 35, \\quad 2 \\times 15 = 30, \\quad 0.5 \\times 30 = 15",
    },
    {
      type: "text",
      content:
        "**Step 2: add.** $10 + 35 + 30 + 15 = 90$ customers. *Why not add the heights?* $2 + 3.5 + 2 + 0.5 = 8$ is a sum of 'customers per minute' and counts nobody.\n\n**Step 3: split the bars at 10 and 20.** The stretch 10–20 cuts through two bars: 10–15 is the right half of the 5–15 bar, and 15–20 is the first third of the 15–30 bar. Take the area of each piece:",
    },
    {
      type: "math",
      latex: "\\underbrace{3.5 \\times 5}_{10\\text{ to }15} + \\underbrace{2 \\times 5}_{15\\text{ to }20} = 17.5 + 10 = 27.5 \\approx 28",
    },
    {
      type: "text",
      content:
        "*Why this is only an estimate:* a histogram does not say where inside a class the customers are. Using part of a bar's area assumes they are spread evenly across it, the same assumption a straight-line ogive makes in 0.5. So about 28 customers stayed 10 to 20 minutes.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (NCERT style: unequal widths).** *Draw a histogram for: 0–10: 8, 10–15: 6, 15–20: 9, 20–30: 12, 30–50: 10.*\n\n**Step 1: check the widths.** They are 10, 5, 5, 10, 20, which are not equal. *Why this step comes first:* with unequal widths, drawing heights equal to $f$ would make the 30–50 bar four times the area it should have relative to a width-5 class.\n\n**Step 2: compute heights.** Use density $\\frac{f}{w}$, or the textbook's adjusted frequency with minimum width 5, which is $5 \\times$ density.",
    },
    {
      type: "table",
      headers: ["Class", "$f$", "Width $w$", "Density $f/w$", "Adjusted $f = \\frac{5}{w} \\times f$"],
      rows: [
        ["0–10", "8", "10", "0.8", "4"],
        ["10–15", "6", "5", "1.2", "6"],
        ["15–20", "9", "5", "1.8", "9"],
        ["20–30", "12", "10", "1.2", "6"],
        ["30–50", "10", "20", "0.5", "2.5"],
        ["Total", "45", "", "", ""],
      ],
    },
    {
      type: "text",
      content:
        "**Step 3: draw and read.** Bars stand on 0, 10, 15, 20, 30, 50 with no gaps. The tallest is 15–20, even though 20–30 has the larger frequency. Drawn at its raw frequency of 10, the 30–50 bar would have stood taller than the 0–10 bar (frequency 8). By density it is the lowest bar, at 0.5. Check the areas: $0.8 \\times 10 + 1.2 \\times 5 + 1.8 \\times 5 + 1.2 \\times 10 + 0.5 \\times 20 = 8 + 6 + 9 + 12 + 10 = 45$.",
    },
    {
      type: "text",
      content:
        "The component below plots frequency density instead of frequency, for the same 40 marks. Slide the width again: now the heights stay on the same scale, because dividing by the width cancels the effect of collecting more values in a wider class. The number printed on each bar is still its frequency.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: MARKS,
        range: { min: 9.5, max: 59.5 },
        xLabel: "Marks",
        view: "histogram",
        binWidth: 10,
        binStart: 9.5,
        binSlider: { min: 2, max: 25, step: 1 },
        density: true,
        stats: [],
        caption:
          "Height = frequency ÷ width, so each bar's area is its frequency. Change the width and the heights stay on the same scale; only the detail changes.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "A histogram is not a bar chart with the gaps removed",
      content:
        "Removing the gaps is a consequence, not the definition. A histogram sits on a continuous number line, so its bars meet at class boundaries, and it measures frequency by **area**. With equal widths you may use frequency as height; with unequal widths you must use frequency density, or the wide classes will lie.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Frequency polygon",
      content:
        "Plot each class's frequency (or density) at its **class mark** and join the points with straight lines. Close the polygon by adding a point of frequency 0 at the class mark of an empty class on each end. For the marks: $(4.5, 0), (14.5, 5), (24.5, 9), (34.5, 14), (44.5, 8), (54.5, 4), (64.5, 0)$. With equal widths, the area under the polygon equals the total area of the histogram, because each triangle cut off a bar is replaced by an equal triangle added outside it. Polygons are handy for putting two distributions on one graph.",
    },
    {
      type: "quiz",
      id: "st0-4-q1",
      variant: "concept",
      question:
        "Classes 0–10 and 10–40 contain 20 and 30 people. A student draws bars of heights 20 and 30 and concludes the 10–40 group is more crowded. What is wrong?",
      options: [
        {
          text: "With unequal widths the heights must be densities: 2 per unit and 1 per unit. The 0–10 class is actually twice as crowded.",
          correct: true,
          feedback:
            "$\\frac{20}{10} = 2$ and $\\frac{30}{30} = 1$. The wider class only holds more people because it covers three times the range.",
        },
        {
          text: "Nothing; bar height is always the frequency.",
          feedback: "Only when every class has the same width. Here the widths are 10 and 30.",
        },
        {
          text: "The bars should have gaps between them.",
          feedback: "A histogram's bars touch, since the classes meet at 10. The real problem is using frequency as height.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-4-q2",
      variant: "practice",
      question: "A class 20–40 has frequency 16. What height should its bar have in a histogram with unequal class widths?",
      options: [
        { text: "$0.8$", correct: true, feedback: "$\\frac{16}{20} = 0.8$ per unit, and area $0.8 \\times 20 = 16$ restores the frequency." },
        { text: "$16$", feedback: "That makes the area $16 \\times 20 = 320$, which is not the frequency." },
        { text: "$1.25$", feedback: "That is width ÷ frequency. Density is frequency ÷ width." },
        { text: "$8$", feedback: "Divide by the width, 20, not by 2." },
      ],
    },
    {
      type: "quiz",
      id: "st0-4-q3",
      variant: "practice",
      question: "In a histogram, the bar over 30–35 kg has frequency density 3.6. How many values are in that class?",
      options: [
        { text: "18", correct: true, feedback: "Frequency = density × width = $3.6 \\times 5 = 18$." },
        { text: "3.6", feedback: "3.6 is the height. The frequency is the area." },
        { text: "126", feedback: "That multiplies by the class mark 35. Multiply by the width, 5." },
        { text: "0.72", feedback: "That divides by the width. Frequency is density times width." },
      ],
    },
    {
      type: "quiz",
      id: "st0-4-q4",
      variant: "practice",
      question: "Which data should be drawn as a bar chart (with gaps) rather than a histogram?",
      options: [
        {
          text: "The number of students in each blood group",
          correct: true,
          feedback: "Blood groups are separate categories with no numerical scale, so the bars stand apart.",
        },
        { text: "Heights of 50 students grouped in 5 cm classes", feedback: "Grouped continuous data: that is exactly what histograms are for." },
        { text: "Times taken to solve a puzzle, grouped in 30-second classes", feedback: "Time is continuous and the classes meet, so use a histogram." },
      ],
    },
    {
      type: "quiz",
      id: "st0-4-q5",
      variant: "practice",
      question: "Equal-width classes have class marks 5, 15, 25, 35. Where does the frequency polygon start and end on the axis?",
      options: [
        {
          text: "At $x = -5$ and $x = 45$, each with frequency 0",
          correct: true,
          feedback: "Add an empty class of the same width at each end and use its class mark: $5 - 10 = -5$ and $35 + 10 = 45$.",
        },
        { text: "At $x = 5$ and $x = 35$", feedback: "That leaves the polygon hanging in the air. It is closed down to the axis one class-width beyond each end." },
        { text: "At $x = 0$ and $x = 40$", feedback: "Those are class boundaries. The polygon uses class marks, including those of the imaginary empty classes." },
      ],
    },
    {
      type: "quiz",
      id: "st0-4-q7",
      variant: "practice",
      question:
        "A histogram has a bar over 0–10 at frequency density 1.4 and a bar over 10–30 at frequency density 2.5. Assuming values are spread evenly within each class, estimate how many values lie between 5 and 20.",
      options: [
        {
          text: "32",
          correct: true,
          feedback: "5 to 10 is half of the first bar: $1.4 \\times 5 = 7$. 10 to 20 is half of the second: $2.5 \\times 10 = 25$. Total $7 + 25 = 32$.",
        },
        { text: "64", feedback: "That uses both bars in full ($14 + 50$). Only the parts from 5 to 20 count." },
        { text: "3.9", feedback: "That adds the heights. Counts are areas: density × width of each piece." },
        { text: "57", feedback: "That uses all of the 10–30 bar. The stretch stops at 20, so take only 10 units of width from it." },
      ],
      hint: "Find the area of the part of each bar that lies between 5 and 20.",
    },
    {
      type: "quiz",
      id: "st0-4-q8",
      variant: "practice",
      question:
        "In a histogram with unequal widths, the class 20–30 (frequency 12) is drawn 4 cm tall. How tall should the bar for 30–50 (frequency 18) be?",
      options: [
        {
          text: "3 cm",
          correct: true,
          feedback:
            "Densities: $\\frac{12}{10} = 1.2$ and $\\frac{18}{20} = 0.9$. Heights are in proportion to density: $4 \\times \\frac{0.9}{1.2} = 3$ cm.",
        },
        { text: "6 cm", feedback: "That scales by frequency, $4 \\times \\frac{18}{12}$. With a class twice as wide, scale by density instead." },
        { text: "12 cm", feedback: "That scales by frequency and by width. Height must be proportional to $\\frac{f}{w}$." },
        { text: "4 cm", feedback: "Only if the densities were equal. Here $0.9 < 1.2$, so the bar is shorter." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "cumulative-frequency-and-ogives",
  title: "0.5 · Cumulative Frequency and Ogives",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A frequency table answers 'how many are in this class?'. Often you want something different: *how many students weigh less than 55 kg?*, or *below what weight do half the students lie?* Those questions are about running totals, and a running-total graph can be read in both directions.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** The weights of 50 students are grouped as below. Build the less-than cumulative frequency by adding each frequency to the total so far.",
    },
    {
      type: "table",
      headers: ["Weight (kg)", "$f$", "Less than …", "Less-than cf", "At least …", "More-than cf"],
      rows: [
        ["40–45", "4", "45", "4", "40", "50"],
        ["45–50", "9", "50", "4 + 9 = 13", "45", "50 − 4 = 46"],
        ["50–55", "15", "55", "13 + 15 = 28", "50", "46 − 9 = 37"],
        ["55–60", "12", "60", "28 + 12 = 40", "55", "37 − 15 = 22"],
        ["60–65", "7", "65", "40 + 7 = 47", "60", "22 − 12 = 10"],
        ["65–70", "3", "70", "47 + 3 = 50", "65", "10 − 7 = 3"],
      ],
    },
    {
      type: "text",
      content:
        "**Check:** the less-than column must end at $n = 50$, and the more-than column must start at 50. The more-than column counts down: the number of students weighing *at least* 55 kg is everyone minus those below 55, which is $50 - 28 = 22$.",
    },
    {
      type: "text",
      content:
        "**Where to plot.** The less-than cumulative frequency 13 means '13 students weigh less than 50 kg'. It is a fact about the point 50, the **upper boundary** of the 45–50 class. Only after the whole class has been counted is the total 13; halfway through the class (at 47.5) we have not yet reached all of those 9 students. So a less-than ogive plots $(\\text{upper boundary}, \\text{cf})$: $(45, 4), (50, 13), (55, 28), (60, 40), (65, 47), (70, 50)$, starting from $(40, 0)$ since nobody is below 40 kg.",
    },
    {
      type: "text",
      content:
        "By the same logic, the more-than cumulative frequency 37 means '37 students weigh 50 kg or more', a fact about the **lower boundary** 50. A more-than ogive plots $(\\text{lower boundary}, \\text{cf})$ and ends at $(70, 0)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Not at the class mark",
      content:
        "Plotting 13 at the class mark 47.5 would claim that 13 students are below 47.5 kg. But some of the 9 students in 45–50 may weigh 48 or 49 kg, so that claim can be false. The running total is only complete at the end of the class. Less-than: upper boundary. More-than: lower boundary. For inclusive classes such as 10–19, use the boundary 19.5, not the limit 19.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: WEIGHTS,
        range: { min: 40, max: 70 },
        xLabel: "Weight (kg)",
        view: "ogive",
        views: ["ogive", "histogram"],
        binWidth: 5,
        binStart: 40,
        ogiveType: "both",
        stats: ["median"],
        editable: false,
        caption:
          "Less-than and more-than ogives for the 50 weights. Drag the horizontal line, or press n/2, and read off the weight. The two curves cross at a height of 25, directly above the median.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Ogive",
      content:
        "An **ogive** (pronounced *oh-jive*) is the graph of cumulative frequency against class boundary, with the points joined by straight lines. A less-than ogive rises from 0 to $n$; a more-than ogive falls from $n$ to 0. Joining with straight lines assumes the values in each class are spread evenly across it.",
    },
    {
      type: "text",
      content:
        "**Reading forwards (value → count).** How many students weigh less than 57 kg? 57 is $\\frac{2}{5}$ of the way through the 55–60 class, where the cf rises from 28 to 40. So",
    },
    {
      type: "math",
      latex: "\\text{cf}(57) \\approx 28 + \\frac{2}{5}(40 - 28) = 28 + 4.8 = 32.8 \\approx 33",
    },
    {
      type: "text",
      content:
        "**Reading backwards (count → value).** Below what weight do half the students lie? Half of 50 is 25, which falls between cf 13 (at 50 kg) and cf 28 (at 55 kg). We need 12 more students out of the 15 in that class, so",
    },
    {
      type: "math",
      latex: "x \\approx 50 + \\frac{25 - 13}{15} \\times 5 = 50 + 4 = 54 \\text{ kg}",
    },
    {
      type: "text",
      content:
        "The value at height $\\frac{n}{2}$ is the **median**, the weight that splits the 50 students into two equal halves. Chapter 1 turns this reading into a formula. Reading at $\\frac{n}{4}$ and $\\frac{3n}{4}$ gives the quartiles, used in Chapter 2.",
    },
    {
      type: "text",
      content:
        "**Why the two ogives cross at the median.** At any weight $x$, (number below $x$) + (number at or above $x$) $= n$. The curves cross where the two counts are equal, so each must be $\\frac{n}{2}$. That is exactly the median. Check with the straight-line pieces in 50–55: the less-than ogive is $13 + 3t$ and the more-than ogive is $37 - 3t$, where $t$ is kg above 50. They meet when $13 + 3t = 37 - 3t$, so $t = 4$: at 54 kg and height 25.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (inclusive classes).** Draw the less-than ogive for the test marks of 0.3 (10–19: 5, 20–29: 9, 30–39: 14, 40–49: 8, 50–59: 4) and estimate the median.\n\n**Step 1: convert to boundaries.** The classes are inclusive, so the cumulative totals belong at 19.5, 29.5, 39.5, 49.5, 59.5. *Why:* '5 students scored less than 20' is true at 19.5 as well as at 20, because nobody can score 19.7. On the continuous axis of a graph, the class really ends at the boundary 19.5.\n\n**Step 2: running totals.** $5, \\; 5 + 9 = 14, \\; 14 + 14 = 28, \\; 28 + 8 = 36, \\; 36 + 4 = 40$. The last total equals $n = 40$, which checks the addition.\n\n**Step 3: points.** $(9.5, 0), (19.5, 5), (29.5, 14), (39.5, 28), (49.5, 36), (59.5, 40)$. The first point is the lower boundary of the first class, where nobody has been counted yet.\n\n**Step 4: median.** $\\frac{n}{2} = 20$ lies between cf 14 (at 29.5) and cf 28 (at 39.5). We need 6 of the 14 students in that class:",
    },
    {
      type: "math",
      latex: "\\text{median} \\approx 29.5 + \\frac{20 - 14}{14} \\times 10 = 29.5 + 4.29 \\approx 33.8",
    },
    {
      type: "text",
      content:
        "**Step 5: compare with the raw data.** Sorting the 40 original marks, the 20th and 21st are 34 and 35, so the true median is 34.5. The ogive estimate, 33.8, is close but not exact. *Why:* grouping throws away where each mark sits inside its class, and the straight line assumes the 14 marks in 30–39 are spread evenly. When you only have the grouped table, this estimate is the best you can do.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (CBSE style: from a more-than table).** *The daily wages of 60 workers are given as a more-than table: at least ₹100: 60; at least ₹120: 54; at least ₹140: 42; at least ₹160: 25; at least ₹180: 10; at least ₹200: 0. (a) Find the frequency distribution. (b) The 10 best-paid workers get a bonus. From what wage does the bonus start? (c) Estimate the median wage.*\n\n**Step 1: frequencies by subtraction.** Workers earning at least ₹100 but less than ₹120 are those in the first count and not in the second: $60 - 54 = 6$. *Why subtraction:* each more-than count includes everyone in the later classes too, so consecutive differences isolate one class.",
    },
    {
      type: "table",
      headers: ["Wage (₹)", "$f$", "Less-than cf (at upper boundary)"],
      rows: [
        ["100–120", "60 − 54 = 6", "6"],
        ["120–140", "54 − 42 = 12", "18"],
        ["140–160", "42 − 25 = 17", "35"],
        ["160–180", "25 − 10 = 15", "50"],
        ["180–200", "10 − 0 = 10", "60"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 2: check.** $6 + 12 + 17 + 15 + 10 = 60$. \n\n**Step 3: the bonus.** The more-than count is exactly 10 at ₹180, so the bonus starts at ₹180 a day. *Why read the more-than table:* 'the top 10' is a question about how many are *at or above* a wage.\n\n**Step 4: the median.** $\\frac{n}{2} = 30$ lies between less-than cf 18 (at 140) and 35 (at 160), so it is in the class 140–160, which holds 17 workers:",
    },
    {
      type: "math",
      latex: "\\text{median} \\approx 140 + \\frac{30 - 18}{17} \\times 20 = 140 + 14.1 \\approx \\text{₹}154",
    },
    {
      type: "text",
      content:
        "Half the workers earn less than about ₹154 a day. Drawing both ogives, one from the more-than table and one from the less-than column, they would cross at $(154, 30)$.",
    },
    {
      type: "quiz",
      id: "st0-5-q1",
      variant: "concept",
      question: "For the class 45–50 with less-than cumulative frequency 13, at which point is it plotted on a less-than ogive?",
      options: [
        {
          text: "$(50, 13)$, at the upper boundary",
          correct: true,
          feedback: "'13 students are below 50 kg' is only true once the whole class has been counted, at its upper end.",
        },
        {
          text: "$(47.5, 13)$, at the class mark",
          feedback: "That claims 13 students are below 47.5 kg, but some of the class's students may weigh 48 or 49.",
        },
        { text: "$(45, 13)$, at the lower boundary", feedback: "Only 4 students are below 45 kg. Lower boundaries belong to the more-than ogive." },
      ],
    },
    {
      type: "quiz",
      id: "st0-5-q2",
      variant: "practice",
      question: "Using the weights table, how many students weigh at least 50 kg but less than 60 kg?",
      options: [
        { text: "27", correct: true, feedback: "cf(60) − cf(50) $= 40 - 13 = 27$, which is also $15 + 12$." },
        { text: "40", feedback: "40 students are below 60 kg. Subtract the 13 who are below 50 kg." },
        { text: "12", feedback: "12 is only the 55–60 class. The range 50–60 also includes the 15 in 50–55." },
        { text: "28", feedback: "28 are below 55 kg. You need those below 60 minus those below 50." },
      ],
    },
    {
      type: "quiz",
      id: "st0-5-q3",
      variant: "practice",
      question: "From the ogive, below what weight do 40 of the 50 students lie?",
      options: [
        { text: "60 kg", correct: true, feedback: "The less-than cf reaches exactly 40 at the upper boundary 60." },
        { text: "57.5 kg", feedback: "That is the class mark of 55–60. The cf of 40 is reached at 60." },
        { text: "55 kg", feedback: "Only 28 students are below 55 kg." },
      ],
    },
    {
      type: "quiz",
      id: "st0-5-q4",
      variant: "practice",
      question:
        "A less-than cumulative table reads: less than 10: 6; less than 20: 16; less than 30: 36; less than 40: 48; less than 50: 50. Estimate the median from the ogive.",
      options: [
        {
          text: "$24.5$",
          correct: true,
          feedback: "$\\frac{n}{2} = 25$ lies between 16 (at 20) and 36 (at 30): $20 + \\frac{25 - 16}{20} \\times 10 = 20 + 4.5 = 24.5$.",
        },
        { text: "$25$", feedback: "25 is $\\frac{n}{2}$, the height to read at, not the answer. Read across to the curve and down." },
        { text: "$30$", feedback: "36 values are already below 30, well past half." },
      ],
      hint: "Find which class contains the 25th value, then go the right fraction of the way through it.",
    },
    {
      type: "quiz",
      id: "st0-5-q5",
      variant: "practice",
      question: "The less-than and more-than ogives of a data set with $n = 80$ cross at the point $(36, 40)$. What does this tell you?",
      options: [
        {
          text: "The median is about 36.",
          correct: true,
          feedback: "They cross where the counts below and above are equal, $\\frac{80}{2} = 40$ each, which is the median.",
        },
        { text: "The median is 40.", feedback: "40 is the cumulative frequency $\\frac{n}{2}$, read on the vertical axis. The median is a value on the horizontal axis." },
        { text: "40 values are equal to 36.", feedback: "The crossing says 40 are below 36 and 40 are at or above it." },
      ],
    },
    {
      type: "quiz",
      id: "st0-5-q6",
      variant: "practice",
      question: "Read the more-than column of the weights table. How many students weigh **at least 55 kg**?",
      options: [
        {
          text: "22",
          correct: true,
          feedback: "The more-than cf at the lower boundary 55 is 22: the 12 + 7 + 3 students in 55–60, 60–65 and 65–70.",
        },
        { text: "28", feedback: "28 is the less-than cf at 55: the students *below* 55 kg. The more-than column counts the rest." },
        { text: "12", feedback: "12 is only the 55–60 class. 'At least 55' includes every heavier class too." },
        { text: "37", feedback: "37 weigh at least 50 kg. Move one row down to the lower boundary 55." },
      ],
    },
    {
      type: "quiz",
      id: "st0-5-q7",
      variant: "practice",
      question:
        "Using the marks ogive $(9.5, 0), (19.5, 5), (29.5, 14), (39.5, 28), (49.5, 36), (59.5, 40)$, estimate how many students scored below 44.5.",
      options: [
        {
          text: "32",
          correct: true,
          feedback: "44.5 is halfway from 39.5 to 49.5, where the cf rises from 28 to 36: $28 + \\frac{1}{2}(36 - 28) = 32$.",
        },
        { text: "36", feedback: "36 students are below 49.5. At 44.5 we are only halfway through the 40–49 class." },
        { text: "28", feedback: "28 are below 39.5. Some of the 8 students in 40–49 also scored below 44.5." },
        { text: "4", feedback: "That is how many of the class 40–49 are counted, but the total below 44.5 also includes the 28 below 39.5." },
      ],
      hint: "Find how far 44.5 is through its class, then go that fraction of the way up the rise.",
    },
    {
      type: "quiz",
      id: "st0-5-q8",
      variant: "practice",
      question:
        "A more-than table reads: at least 0: 30; at least 10: 26; at least 20: 17; at least 30: 6; at least 40: 0. How many values lie in the class 20–30?",
      options: [
        { text: "11", correct: true, feedback: "At least 20 minus at least 30: $17 - 6 = 11$." },
        { text: "17", feedback: "17 are *at least* 20, which includes the 6 in 30–40. Subtract them." },
        { text: "9", feedback: "$26 - 17 = 9$ is the class 10–20. Move one row down." },
        { text: "6", feedback: "6 is the class 30–40, the values at least 30." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "honest-and-misleading-pictures",
  title: "0.6 · Honest and Misleading Pictures",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A graph is an argument. The same numbers can be drawn to make a difference look huge or tiny, a shape look smooth or lumpy, or a trend look real when it is not. Most misleading graphs are not false: every number on them is correct. They mislead through choices of axis, width and window. The defence is a habit: **read the axes before you read the shape.**",
    },
    {
      type: "text",
      content: "First, the honest pictures for each kind of data.",
    },
    {
      type: "text",
      content:
        "**Pie charts (categorical).** A pie shows parts of one whole. Each sector's angle is proportional to its frequency: $\\text{angle} = \\frac{f}{n} \\times 360^\\circ$. **Worked example:** the blood groups of 40 students are O 16, B 12, A 8, AB 4. Angles: O $\\frac{16}{40} \\times 360^\\circ = 144^\\circ$, B $108^\\circ$, A $72^\\circ$, AB $36^\\circ$. Check: $144 + 108 + 72 + 36 = 360$. A bar chart of the same data is just as honest and makes it easier to compare categories of similar size.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style: reading a pie backwards).** *A pie chart shows a family's monthly expenditure of ₹40 000. The sector for food has angle $108^\\circ$. (a) How much is spent on food? (b) The family spends ₹6000 on education. What is the angle of that sector?*\n\n**Step 1: the fraction.** The whole pie is $360^\\circ$, so the food sector is $\\frac{108}{360} = 0.3$ of the total. *Why start with the fraction:* angle, frequency and amount are all in the same proportion, so the fraction is the bridge between them.\n\n**Step 2: the amount.** $0.3 \\times 40\\,000 = 12\\,000$, so ₹12 000 goes on food.\n\n**Step 3: the other direction.** Education is $\\frac{6000}{40\\,000} = 0.15$ of the total, so its angle is $0.15 \\times 360^\\circ = 54^\\circ$.",
    },
    {
      type: "text",
      content:
        "**Stem-and-leaf plots (small numerical sets).** Split each value into a stem (tens digit) and a leaf (units digit). For 23, 27, 31, 34, 34, 38, 41, 45, 45, 45, 49, 52, 56:",
    },
    {
      type: "table",
      headers: ["Stem", "Leaves"],
      rows: [
        ["2", "3 7"],
        ["3", "1 4 4 8"],
        ["4", "1 5 5 5 9"],
        ["5", "2 6"],
      ],
    },
    {
      type: "text",
      content:
        "Key: 4 | 5 means 45. Turn it on its side and it is a histogram with classes 20–29, 30–39, …, but it keeps every original value. You can read that 45 occurs three times, that 6 of the 13 values are below 40, and that the values peak in the 40s.",
    },
    {
      type: "text",
      content: "Now the tricks. Each one is a legitimate-looking choice that changes what your eye concludes.",
    },
    {
      type: "table",
      headers: ["Trick", "What it looks like", "What to check"],
      rows: [
        ["Truncated axis", "Bars for 102 and 108 on an axis starting at 100 look 2 units and 8 units tall: four times as big", "Does the vertical axis start at 0? The real ratio is $\\frac{108}{102} \\approx 1.06$."],
        ["Unequal widths without density", "A wide class looks crowded because it collects more values", "Are the widths equal? If not, is the height frequency density?"],
        ["3-D or tilted pie", "Front slices look bigger than back slices of the same size", "Are the percentages printed? Prefer a flat pie or a bar chart."],
        ["Cherry-picked window", "A 'steady rise' chosen from the three years that happened to rise", "What happens before and after the window shown?"],
        ["Bin choice", "Very wide classes hide two peaks; very narrow ones invent noise", "Would a different class width tell a different story?"],
        ["Pictograms scaled in two directions", "A coin twice as tall is also twice as wide, so four times the area", "Is the quantity shown by length or by area?"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example (measuring a lie).** A company's annual report draws its sales as bars: ₹480 crore last year and ₹520 crore this year, on a vertical axis that starts at 450. How much bigger does this year look, and how much bigger is it?\n\n**Step 1: what the eye sees.** The visible bars are $480 - 450 = 30$ and $520 - 450 = 70$ units tall, so this year looks $\\frac{70}{30} \\approx 2.33$ times as big. *Why subtract 450:* the eye compares the lengths drawn, and everything below 450 has been cut off.\n\n**Step 2: the truth.** $\\frac{520}{480} \\approx 1.083$, so sales grew by about 8.3%.\n\n**Step 3: the exaggeration.** The picture makes growth of 8% look like growth of 133%. The honest fix for a bar chart is an axis starting at 0. If you really need to show a small change, plot the *change* itself, or use a line graph with its axis clearly labelled.",
    },
    {
      type: "text",
      content:
        "**A pictogram done honestly.** To show that a quantity grew 1.5 times using a picture scaled in both directions, the *area* should grow 1.5 times. Area grows as the square of the scale factor, so each side should grow by $\\sqrt{1.5} \\approx 1.22$, not by 1.5. Scaling both sides by 1.5 would make the picture $1.5^2 = 2.25$ times as big.",
    },
    {
      type: "text",
      content:
        "**Bin choice, live.** These are the waiting times of 33 patients at a clinic. With a class width of 20 minutes the histogram shows one lump. Slide the width down to about 5.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: WAITS,
        range: { min: 0, max: 60 },
        xLabel: "Waiting time (minutes)",
        view: "histogram",
        views: ["histogram", "dotplot"],
        binWidth: 20,
        binStart: 0,
        binSlider: { min: 2, max: 20, step: 1 },
        stats: [],
        editable: false,
        caption:
          "At width 20 there is one peak. At width 5 there are two: patients seen by a quick doctor wait about 20 minutes, and those seen by a slow one wait about 40. The dot plot shows the truth directly.",
      },
    },
    {
      type: "quiz",
      id: "st0-6-q7",
      variant: "concept",
      question:
        "A report draws the clinic's waiting times as a histogram with 20-minute classes and says 'waits are typically 20–40 minutes, with a single peak'. What does a narrower class width reveal?",
      options: [
        {
          text: "Two clusters, near 20 and near 40 minutes, so 'typical' hides two different groups of patients",
          correct: true,
          feedback:
            "At width 5 the single lump splits into two peaks with almost nobody waiting around 30. A single 'typical wait' describes neither group.",
        },
        {
          text: "Nothing: class width does not change the shape of a histogram",
          feedback: "Slide the width in the component above. Wide classes can merge separate peaks into one lump.",
        },
        {
          text: "Narrower classes are always more honest, so width 1 would be best",
          feedback:
            "Too narrow invents noise: with 33 values, 1-minute classes make a jagged comb of 0s, 1s and 2s. Try several widths and look for a shape that persists.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q8",
      variant: "concept",
      question:
        "A tilted 3-D pie chart shows four phone brands with 25% each. The slice at the front looks much larger than the slice at the back. What should you conclude?",
      options: [
        {
          text: "The slices are equal; the perspective enlarges the front slice and its visible edge",
          correct: true,
          feedback: "Tilting squashes the back and shows the thickness of the front. A flat pie or a bar chart shows 25% as 25%.",
        },
        {
          text: "The front brand has the largest share",
          feedback: "The printed shares are all 25%. What looks bigger is only nearer to you in the drawing.",
        },
        {
          text: "The chart must contain a data error",
          feedback: "The numbers are fine. The distortion comes from the 3-D drawing, not the data.",
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "A checklist before believing a graph",
      content:
        "1. What is on each axis, and in what units?\n2. Does the vertical axis start at zero (for bars it should)?\n3. Are the classes equal in width, and if not, is density used?\n4. Is area being used to show a quantity that should be shown by length?\n5. What was left out: other years, other groups, the total?",
    },
    {
      type: "quiz",
      id: "st0-6-q1",
      variant: "concept",
      question:
        "An advert shows two bars: 'Brand X: 102 hours' and 'Brand Y: 108 hours' of battery life. Brand Y's bar is four times as tall. The claim: 'Brand Y lasts four times longer.' What is the trick?",
      options: [
        {
          text: "The vertical axis starts at 100, so bar lengths show 2 and 8 instead of 102 and 108. Y lasts about 6% longer.",
          correct: true,
          feedback: "$\\frac{108}{102} \\approx 1.06$. A truncated axis turns a small difference into a big-looking one.",
        },
        {
          text: "There is no trick; the bars are drawn correctly to their values.",
          feedback: "If the bars were drawn from zero, 108 would be only slightly taller than 102, not four times as tall.",
        },
        {
          text: "The bars should touch because battery life is continuous.",
          feedback: "These are two separate brands, so a bar chart with gaps is fine. The problem is the axis.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q2",
      variant: "concept",
      question:
        "A report groups household incomes as ₹0–1 lakh (30 households), ₹1–2 lakh (40) and ₹2–10 lakh (50), drawing bar heights 30, 40, 50. It concludes 'most families earn ₹2–10 lakh; that is where the crowd is'. What is wrong?",
      options: [
        {
          text: "The last class is 8 lakh wide. Its density is only 6.25 per lakh, versus 30 and 40 for the others, so it is the thinnest part of the distribution.",
          correct: true,
          feedback:
            "$\\frac{50}{8} = 6.25$. Heights must be frequency densities when widths differ. The crowd is in the ₹1–2 lakh class.",
        },
        {
          text: "Nothing: 50 is the largest frequency, so that class has the most families.",
          feedback:
            "It has the most families only because it covers eight times as wide a range of incomes. 'Where the crowd is' is a question about density.",
        },
        {
          text: "Incomes are categorical, so a histogram cannot be used.",
          feedback: "Income is numerical and continuous in practice, so a histogram is right. The fault is using frequency as height with unequal widths.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q3",
      variant: "practice",
      question: "In a pie chart of 180 survey replies, the category 'Cricket' has 45 replies. What is its sector angle?",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "$\\frac{45}{180} \\times 360^\\circ = 90^\\circ$, a quarter of the pie." },
        { text: "$45^\\circ$", feedback: "That uses the frequency as the angle. Multiply the fraction $\\frac{45}{180}$ by $360^\\circ$." },
        { text: "$25^\\circ$", feedback: "$\\frac{45}{180} = 25\\%$, but the angle is 25% of $360^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q4",
      variant: "practice",
      question: "From the stem-and-leaf plot above (2 | 3 7, 3 | 1 4 4 8, 4 | 1 5 5 5 9, 5 | 2 6), how many values are 45 or more?",
      options: [
        { text: "6", correct: true, feedback: "45, 45, 45, 49 from stem 4 and 52, 56 from stem 5." },
        { text: "4", feedback: "Don't forget the stem-5 values 52 and 56." },
        { text: "7", feedback: "41 is below 45. Count 45, 45, 45, 49, 52, 56." },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q5",
      variant: "concept",
      question:
        "A company chart shows its share price for March to May, rising steadily, captioned 'Our shares only go up'. Over the full year, the price fell by 30%. Which trick is this?",
      options: [
        {
          text: "A cherry-picked window: only the months that support the claim are shown.",
          correct: true,
          feedback: "Always ask what happened outside the window. Three rising months say nothing about the year.",
        },
        { text: "A truncated vertical axis", feedback: "The axis might also be truncated, but the main problem is which months were chosen." },
        { text: "Unequal class widths", feedback: "There are no classes here; this is a time series." },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q6",
      variant: "practice",
      question:
        "A poster shows sales doubling by drawing the second year's money bag twice as tall **and** twice as wide as the first. How much bigger does the second bag look?",
      options: [
        {
          text: "About four times, because the area grew by $2 \\times 2 = 4$",
          correct: true,
          feedback: "Eyes judge area. To show doubling honestly, scale only one dimension, or scale the area by 2.",
        },
        { text: "Twice, exactly as intended", feedback: "Height and width both doubled, so the area quadrupled." },
        { text: "Eight times", feedback: "That would be a solid scaled in three directions. A flat picture scales by $2 \\times 2$." },
      ],
    },
    {
      type: "quiz",
      id: "st0-6-q9",
      variant: "practice",
      question: "A pie chart shows a monthly budget of ₹36 000. The rent sector has angle $80^\\circ$. How much is the rent?",
      options: [
        {
          text: "₹8000",
          correct: true,
          feedback: "$\\frac{80}{360} = \\frac{2}{9}$ of the budget, and $\\frac{2}{9} \\times 36\\,000 = 8000$.",
        },
        { text: "₹2880", feedback: "That is 8% of the budget. The fraction is $\\frac{80}{360}$, not $\\frac{80}{1000}$." },
        { text: "₹28 800", feedback: "That is $\\frac{80}{100}$ of the budget. A pie has $360^\\circ$, not 100." },
        { text: "₹450", feedback: "That is $\\frac{36\\,000}{80}$. Multiply the budget by the fraction $\\frac{80}{360}$." },
      ],
      hint: "First find what fraction of $360^\\circ$ the sector is.",
    },
    {
      type: "quiz",
      id: "st0-6-q10",
      variant: "practice",
      question:
        "A bar chart shows exam pass rates of 60% and 64% for two schools, with the vertical axis starting at 56%. How many times taller does the second bar **look**, and how much higher is the rate really?",
      options: [
        {
          text: "Looks 2 times as tall; really about 1.07 times (4 percentage points higher)",
          correct: true,
          feedback: "Visible lengths are $60 - 56 = 4$ and $64 - 56 = 8$, a ratio of 2. The real ratio is $\\frac{64}{60} \\approx 1.07$.",
        },
        {
          text: "Looks about 1.07 times as tall; really 2 times",
          feedback: "It is the other way round. Cutting the axis at 56 makes the bars 4 and 8 units long, so the picture exaggerates.",
        },
        {
          text: "Looks 4 times as tall; really about 1.07 times",
          feedback: "4 is the difference in percentage points. The visible bars are 4 and 8 units long, a ratio of 2.",
        },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.7 · Chapter 0 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Mixed questions from the whole chapter: classifying data, class boundaries, histograms with unequal widths, reading ogives both ways, and spotting misleading pictures. Work each one on paper before choosing.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in four lines",
      content:
        "1. The type of data decides the picture: categories get bar or pie charts, numbers get dot plots, histograms and ogives.\n2. Group numerical data into classes, and use class boundaries (not limits) for widths and drawing.\n3. In a histogram, area is frequency, so with unequal widths the height is frequency density $\\frac{f}{w}$.\n4. Cumulative frequency is plotted at upper boundaries (less-than) or lower boundaries (more-than); read across at $\\frac{n}{2}$ for the median.",
    },
    {
      type: "quiz",
      id: "st0-7-q1",
      variant: "mastery",
      question: "Which of these is numerical, **continuous** data?",
      options: [
        { text: "The time a patient waits at a clinic", correct: true, feedback: "Time can take any value in an interval." },
        { text: "The number of goals scored in a match", feedback: "Goals are counted: 0, 1, 2, …. That is discrete." },
        { text: "The jersey numbers of a team", feedback: "Jersey numbers are labels: categorical." },
        { text: "Students' grades A1, A2, B1", feedback: "Grades are ordered categories: categorical (ordinal)." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q2",
      variant: "mastery",
      question: "Inclusive classes are 25–34, 35–44, 45–54. What are the boundaries and class mark of 35–44?",
      options: [
        {
          text: "Boundaries 34.5–44.5, class mark 39.5",
          correct: true,
          feedback: "The adjustment is $\\frac{35 - 34}{2} = 0.5$, and $\\frac{35 + 44}{2} = 39.5$.",
        },
        { text: "Boundaries 35–44, class mark 39.5", feedback: "Those are the limits. Boundaries close the gaps between classes." },
        { text: "Boundaries 34.5–44.5, class mark 40", feedback: "The midpoint of 34.5 and 44.5 is 39.5." },
        { text: "Boundaries 34–45, class mark 39.5", feedback: "Each boundary should move out by half the gap, 0.5, not by 1." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q3",
      variant: "mastery",
      question:
        "Classes 0–5, 5–15 and 15–35 have frequencies 10, 30 and 20. In a correctly drawn histogram, which bar is tallest?",
      options: [
        {
          text: "5–15, with frequency density 3",
          correct: true,
          feedback: "Densities: $\\frac{10}{5} = 2$, $\\frac{30}{10} = 3$, $\\frac{20}{20} = 1$.",
        },
        { text: "15–35, since it is the widest", feedback: "Its density is only $\\frac{20}{20} = 1$; it is the shortest bar." },
        { text: "0–5, since it is the narrowest", feedback: "Its density is 2, less than the 3 of the 5–15 class." },
        { text: "All three are the same height", feedback: "The densities are 2, 3 and 1, so the heights differ." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q4",
      variant: "mastery",
      question: "A histogram bar over 60–75 has height (frequency density) 1.6. How many values are in that class?",
      options: [
        { text: "24", correct: true, feedback: "Frequency = density × width $= 1.6 \\times 15 = 24$." },
        { text: "1.6", feedback: "That is the height. The frequency is the area." },
        { text: "120", feedback: "That multiplies by 75, the upper boundary. Multiply by the width 15." },
        { text: "About 0.107", feedback: "That divides by the width. Frequency is density times width." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q5",
      variant: "mastery",
      question:
        "A less-than cumulative table reads: less than 10: 5; less than 20: 17; less than 30: 35; less than 40: 46; less than 50: 50. How many values are 30 or more?",
      options: [
        { text: "15", correct: true, feedback: "$50 - 35 = 15$. That is the more-than cf plotted at the lower boundary 30." },
        { text: "35", feedback: "35 values are *less* than 30." },
        { text: "11", feedback: "11 is the 30–40 class alone. Include the 4 values in 40–50." },
        { text: "18", feedback: "18 is the frequency of 20–30." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q6",
      variant: "mastery",
      question: "For the same table (n = 50), estimate the median from the ogive.",
      options: [
        {
          text: "About 24.4",
          correct: true,
          feedback: "$\\frac{n}{2} = 25$ lies between 17 and 35: $20 + \\frac{25 - 17}{18} \\times 10 = 20 + 4.4 \\approx 24.4$.",
        },
        { text: "25", feedback: "25 is the height $\\frac{n}{2}$, not the median value." },
        { text: "About 22.3", feedback: "That divides by the cumulative frequency 35. Divide by the frequency of the median class itself, $35 - 17 = 18$." },
      ],
      hint: "Which class contains the 25th value, and how far into it do you go?",
    },
    {
      type: "quiz",
      id: "st0-7-q7",
      variant: "mastery",
      question: "Where should the less-than cumulative frequency of the inclusive class 20–29 be plotted?",
      options: [
        { text: "At 29.5, the upper class boundary", correct: true, feedback: "The count is complete only at the end of the class, and inclusive classes need boundaries." },
        { text: "At 29, the upper class limit", feedback: "Values like 29.3 would be missed. Use the boundary 29.5." },
        { text: "At 24.5, the class mark", feedback: "Part of the class lies above 24.5, so the count there is not yet complete." },
        { text: "At 19.5, the lower class boundary", feedback: "Lower boundaries are for the more-than ogive." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q8",
      variant: "mastery",
      question:
        "In a class of 60, 12 students walk to school. What are the relative frequency and the pie-chart angle for 'walk'?",
      options: [
        { text: "$0.2$ and $72^\\circ$", correct: true, feedback: "$\\frac{12}{60} = 0.2$, and $0.2 \\times 360^\\circ = 72^\\circ$." },
        { text: "$0.2$ and $20^\\circ$", feedback: "The angle is 20% of $360^\\circ$, not $20^\\circ$." },
        { text: "$12$ and $72^\\circ$", feedback: "12 is the frequency. Relative frequency divides by 60." },
        { text: "$0.12$ and $43.2^\\circ$", feedback: "That divides by 100 instead of by 60." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q9",
      variant: "mastery",
      question:
        "A chart of monthly rainfall shows 48 mm and 52 mm as bars 1 cm and 5 cm tall. Which statement is honest?",
      options: [
        {
          text: "The axis starts at 47 mm; the real increase is about 8%, not five-fold.",
          correct: true,
          feedback:
            "Bar lengths 1 and 5 correspond to $48 - 47$ and $52 - 47$. The actual ratio is $\\frac{52}{48} \\approx 1.08$.",
        },
        { text: "The second month had five times the rain.", feedback: "That is what the truncated axis wants you to think. 52 is not five times 48." },
        { text: "The chart is fine because the numbers are labelled.", feedback: "The labels are correct, but the bar lengths still exaggerate the difference." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q10",
      variant: "mastery",
      question: "Which picture suits the scores of 15 students on a 50-mark test, if you also want to keep every individual score?",
      options: [
        { text: "A stem-and-leaf plot", correct: true, feedback: "It shows the shape like a histogram while keeping every value." },
        { text: "A pie chart", feedback: "Pies are for parts of a whole across categories, not numerical scores." },
        { text: "A grouped histogram", feedback: "It shows the shape, but individual scores are lost inside the classes." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q11",
      variant: "mastery",
      question:
        "Equal classes 0–10, 10–20, 20–30, 30–40 have frequencies 3, 7, 6, 2. What are the first and last points of the frequency polygon?",
      options: [
        {
          text: "$(-5, 0)$ and $(45, 0)$",
          correct: true,
          feedback: "The class marks are 5, 15, 25, 35. Close the polygon at the class marks of empty classes one width beyond each end: $5 - 10 = -5$ and $35 + 10 = 45$.",
        },
        { text: "$(5, 3)$ and $(35, 2)$", feedback: "Those are the first and last plotted classes, but the polygon is closed down to the axis beyond them." },
        { text: "$(0, 0)$ and $(40, 0)$", feedback: "Those are the outer class boundaries. The polygon uses class marks, including those of the imaginary empty classes." },
        { text: "$(0, 3)$ and $(40, 2)$", feedback: "Frequencies are plotted at class marks, not at boundaries." },
      ],
    },
    {
      type: "quiz",
      id: "st0-7-q12",
      variant: "mastery",
      question: "Which data set should be drawn as a histogram rather than a bar chart?",
      options: [
        {
          text: "The heights of 60 students, grouped as 140–150, 150–160, … cm",
          correct: true,
          feedback: "Heights are continuous and the classes meet on a number line, so the bars touch and area shows frequency.",
        },
        { text: "The number of students choosing each of five sports", feedback: "Sports are separate categories with no number line, so a bar chart with gaps is right." },
        { text: "The number of students with each blood group", feedback: "Blood groups are nominal categories: bar chart or pie chart." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now turn raw data into a table and an honest picture. Chapter 1 asks for one number to represent the whole pile, and finds that there are three good candidates, each answering a different question.",
    },
  ]),
};

export const statisticsChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
