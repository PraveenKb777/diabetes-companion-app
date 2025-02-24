import {IBottomSheetContent} from './context/BottomSheetContext';

interface IPopUpContents {
  [key: string]: IBottomSheetContent;
}

const popUpContent: IPopUpContents = {
  'Diabetes Mellitus': {
    head: 'Diabetes Mellitus',
    desc: 'Diabetes mellitus is a medical condition where insufficient insulin production raises blood glucose levels.',
  },
  'Monogenic Diabetes Mellitus': {
    head: 'Monogenic Diabetes Mellitus',
    desc: 'Monogenic diabetes results from a rare single-gene mutation, often misdiagnosed as type 1 or type 2 diabetes due to similar symptoms.',
    content: [
      {
        head: 'Prevalence rate',

        bullet: true,
        desc: ['1-5 percent from other types of diabetes'],
      },

      {
        head: 'Criteria for Diagnosis',

        bullet: true,
        desc: [
          'Infants before  months of age, below 35 years ',
          'Continuous two or three generation with diabetes',
          'Normal or mildly overweight',
          'Mild fasting hyperglycemia',
          'HbA1C: <7.5 percent ',
          'Serum Insulin level(Normal value- 0.7-9µIU/mL)-Normal',
          'Glutamic Acid Decarboxylase Antibodie-Absent',
          'Insulin Autoantibodies -Absent',
          'C peptide (Normal value 0.9 to 1.8 nanograms per milliliter)- ≥0.2 mol/mmol',
        ],
      },

      {
        head: 'Types',

        bullet: false,
        desc: 'Neonatal Diabetes Mellitus (NDM) & Maturity Onset Diabetes of the Young (MODY).',
      },

      {
        head: 'Causes',

        bullet: false,
        desc: 'Single gene mutations, inherited from parents (autosomal dominant).',
      },

      {
        head: 'Symptoms  & complications',

        bullet: false,
        desc: 'Affecting eyes, kidneys, heart, nerves & blood vessels.',
      },

      {
        head: 'Tests',

        bullet: false,
        desc: 'Blood test, Next generation Gene Sequencing test.',
      },

      {
        head: 'Treatment',

        bullet: false,
        desc: 'Tablet in most of the cases (especially sulfonyl urea)/Insulin prescription is rare, Diet and Exercise',
      },
    ],
  },
  'Neonatal Diabetes Mellitus (NDM)': {
    head: 'Neonatal Diabetes Mellitus (NDM)',
    desc: 'Neonatal diabetes mellitus occurs in the first 6-12 months of life\n\nMisdiagnosed as type 1 diabetes.',
    content: [
      {
        head: 'Causes',
        bullet: true,
        desc: [
          'Mutations in KCNJ11 & ABCC8 affects the pancreatuic beta cell K-ATP channel which in turn affects the insulin production',
          'Continuous two to three generation with diabetes',
        ],
      },
      {
        head: 'Types',
        bullet: false,
        desc: 'Permanents neonatal diabetes mellitus diabetes (PNDM), transient neonatal diabetes mellitus (TNDM) & syndromic neonatal diabetes mellitus (SNDM)',
      },
      {
        head: 'Treatment',
        bullet: false,
        desc: 'Sulphonyl urea & other oral hypoglycemic agent, no insulin treatment ',
      },
    ],
  },
  'Polygenic Diabetes Mellitus': {
    head: 'Polygenic Diabetes Mellitus',
    desc: 'Polygenic diabetes mellitus is a condition caused due to mutation in one or more genes.',
    content: [
      {
        head: 'Types',
        bullet: false,
        desc: 'Types 1 diabetes mellitus, Type 2 diabetes mellitus, Gestational diabetes mellitus ',
      },
    ],
  },
  'Type 1 Diabetes Mellitus': {
    head: 'Type 1 Diabetes Mellitus',
    desc: 'Type 1 diabetes mellitus is a chronic condition in which the pancreas produces little or no insulin.',
    content: [
      {
        head: 'Age of diagnosis',
        bullet: false,
        desc: 'Children ≤ 15 years ',
      },
      {
        head: 'Body mass index:',
        bullet: false,
        desc: 'Underweight or normal',
      },
      {
        head: 'Family Inheritance',
        bullet: false,
        desc: '<15%',
      },
      {
        head: 'Causes',
        bullet: false,
        desc: 'Heredity, Environmental factor, Autoimmune response, Age ',
      },
      {
        head: 'Symptoms',
        bullet: false,
        desc: 'Frequent urination, excessive hunger, excessive thirst, tiredness, blurred vision, mood swings',
      },
      {
        head: 'Complications',
        bullet: false,
        desc: 'Diabetic neuropathy, diabetes nephropathy, diabetes foot cardiac problems, ketoacidosis',
      },
      {
        head: 'HbA1C',
        bullet: false,
        desc: '>6.5 percent',
      },
      {
        head: 'Serum Insulin level (Normal value- 0.7-9µIU/mL)',
        bullet: false,
        desc: 'Low',
      },
      {
        head: 'Glutamic Acid Decarboxylase Antibodies',
        bullet: false,
        desc: 'Present',
      },
      {
        head: 'Insulin Autoantibodies',
        bullet: false,
        desc: 'Present',
      },
      {
        head: 'C peptide (Normal value - 0.9 to 1.8 nanograms per milliliter)',
        bullet: false,
        desc: 'Low',
      },
      {
        head: 'Treatment',
        bullet: false,
        desc: 'Oral Hypoglycemic Agent, Insulin treatment, Exercise  & Diet',
      },
    ],
  },
  'Type 2 Diabetes Mellitus': {
    head: 'Type 2 Diabetes Mellitus',
    content: [
      {
        head: 'Age of diagnosis',
        bullet: false,
        desc: 'Adult <40 years  ',
      },
      {
        head: 'Body mass index:',
        bullet: false,
        desc: 'Overweight or obese',
      },
      {
        head: 'Family Inheritance',
        bullet: false,
        desc: '<50%',
      },
      {
        head: 'Causes',
        bullet: false,
        desc: 'Heredity, Environmental factor, Autoimmune response, Age ',
      },
      {
        head: 'Symptoms',
        bullet: false,
        desc: 'Frequent urination, excessive hunger, excessive thirst, tiredness, blurred vision, mood swings',
      },
      {
        head: 'Complications',
        bullet: false,
        desc: 'Diabetic neuropathy, diabetes nephropathy, diabetes foot, cardiac problems, ketoacidosis(less common)',
      },
      {
        head: 'HbA1C',
        bullet: false,
        desc: '>6.5 percent',
      },
      {
        head: 'Serum Insulin level (Normal value- 0.7-9µIU/mL)',
        bullet: false,
        desc: 'High',
      },
      {
        head: 'Glutamic Acid Decarboxylase Antibodies',
        bullet: false,
        desc: 'Absent',
      },
      {
        head: 'Insulin Autoantibodies',
        bullet: false,
        desc: 'Present',
      },
      {
        head: 'C peptide (Normal value - 0.9 to 1.8 nanograms per milliliter)',
        bullet: false,
        desc: 'Low',
      },
      {
        head: 'Treatment',
        bullet: false,
        desc: 'Oral Hypoglycemic Agent, Insulin treatment, Exercise  & Diet',
      },
    ],
  },
  'Gestational Diabetes Mellitus': {
    head: 'Gestational Diabetes Mellitus',
    content: [
      {
        head: 'Age of diagnosis',
        bullet: false,
        desc: 'Adult <40 years  ',
      },
      {
        head: 'Body mass index:',
        bullet: false,
        desc: 'Overweight or obese',
      },
      {
        head: 'Family Inheritance',
        bullet: false,
        desc: '<50%',
      },
      {
        head: 'Causes',
        bullet: false,
        desc: 'Heredity, Environmental factor, Autoimmune response, Age ',
      },
      {
        head: 'Symptoms',
        bullet: false,
        desc: 'Frequent urination, excessive hunger, excessive thirst, tiredness, blurred vision, mood swings',
      },
      {
        head: 'Complications',
        bullet: false,
        desc: 'Diabetic neuropathy, diabetes nephropathy, diabetes foot, cardiac problems, ketoacidosis(less common)',
      },
      {
        head: 'HbA1C',
        bullet: false,
        desc: '>6.5 percent',
      },
      {
        head: 'Serum Insulin level (Normal value- 0.7-9µIU/mL)',
        bullet: false,
        desc: 'High',
      },
      {
        head: 'Glutamic Acid Decarboxylase Antibodies',
        bullet: false,
        desc: 'Absent',
      },
      {
        head: 'Insulin Autoantibodies',
        bullet: false,
        desc: 'Present',
      },
      {
        head: 'C peptide (Normal value - 0.9 to 1.8 nanograms per milliliter)',
        bullet: false,
        desc: 'Low',
      },
      {
        head: 'Treatment',
        bullet: false,
        desc: 'Oral Hypoglycemic Agent, Insulin treatment, Exercise  & Diet',
      },
    ],
  },
  'Maturity Onset Diabetes of the young (MODY)': {
    head: 'Maturity Onset Diabetes of the young (MODY)',
    desc: 'Maturity Onset Diabetes of the Young is a rare genetic disease with familial inheritance, often misdiagnosed as type 1 or type 2 diabetes due to similar symptoms.',
    content: [
      {
        head: 'Prevalence rate',
        bullet: false,
        desc: '1-5 percent from other types of diabetes ',
      },
      {
        head: 'Criteria for Diagnosis',
        bullet: true,
        desc: [
          'Below 30 years',
          'Continuous two or three generations with diabetes',
          'Mild fasting hyperglycemia',
          'Serum Insulin level (Normal value- 0.7-9µIU/mL)- Normal',
          'Glutamic Acid Decarboxylase Antibodies -Absent',
          'Insulin Autoantibodies - Absent',
          '	C peptide (Normal value - 0.9 to 1.8 nanograms per milliliter)- ≥0.2 mol/mmol',
        ],
      },
      {
        head: 'Types',
        bullet: false,
        desc: 'HNF4A (MODY1), GCK (MODY2), HNF1A  (MODY3), PDX1 (MODY4) , HNF1B (MODY5), NEUROD1 (MODY6), KLF11 (MODY7), CEL (MODY8), PAX4 (MODY9), INS (MODY10), BLK (MODY11), ABCC8 (MODY12), KCNJ11 (MODY13), APPL1 (MODY14)',
      },
      {
        head: 'Causes',
        bullet: false,
        desc: 'Single gene mutations, family history',
      },
      {
        head: 'Symptoms  & complications',
        bullet: false,
        desc: 'Affecting eyes, kidneys, heart, nerves & blood vessels.',
      },
      {
        head: 'Tests',
        bullet: false,
        desc: 'Blood test, Next generation Gene Sequencing test',
      },
      {
        head: 'Treatment',
        bullet: false,
        desc: 'Tablet in most of the cases (especially sulfonyl urea)/Insulin prescription is rare, Diet and Exercise',
      },
    ],
  },
  'Family history': {
    head: 'Family history',
    bullet: true,
    desc: [
      'Risk increases with family history of diabetes.',
      'Genetic predispositions increase susceptibility.',
    ],
  },
  'Lifestyle Practices': {
    head: 'Unhealthy lifestyle practices',
    bullet: true,
    desc: [
      'Unhealthy diet high in sugar & processed foods.',
      'Physically inactive.',
      'Excessive smoking & alcohol consumption.',
    ],
  },
  'Obese/Overweight': {
    head: 'Obese/Overweight',
    bullet: true,
    desc: [
      'Excess body fat, especially around the abdomen, hinders insulin function.',
      'Body Mass Index of 30 or higher, Waist to Hip Ratio of 0.8 or higher for women & 0.9 or higher for men disrupts insulin, increase the risk of diabetes.',
    ],
  },
  'Other comorbidities': {
    head: 'Other comorbidities',
    bullet: true,
    desc: [
      'Strained vessels impact insulin secretion.',
      'Hypothyroidism slows metabolism.',
      'Co-occurring diabetes and heart disease worsen outcomes.',
      'PCOS increases diabetes risk through insulin resistance',
      'Declining kidney function affects diabetes management by impacting insulin.',
    ],
  },
  'Long-term medication use': {
    head: 'Long-term medication use',
    bullet: false,
    desc: 'Certain medications, like steroids or some antipsychotics, can raise blood sugar levels and increase diabetes risk. Discuss potential metabolic effects with your healthcare provider.',
  },
  'Post-surgical complications': {
    head: 'Post-surgical complications',
    bullet: false,
    desc: 'Some surgeries, like bariatric procedures, can influence insulin sensitivity and glucose control, creating a temporary or lasting diabetes risk. Prioritize monitoring and follow-up care after surgery.',
  },
  Age: {
    head: 'Age',
    bullet: false,
    desc: 'Early diagnosis & prevention strategies are crucial for older adults (above 45 years).',
  },
  Polyuria: {
    head: 'Polyuria (Excessive urination)',
    desc: "Feeling like you constantly need to pee, even at night, could be a sign your body's struggling to handle blood sugar.",
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Stay hydrated, maintain a consistent schedule for meals & medications & consult with a healthcare professional to optimize blood sugar control.',
      },
    ],
  },
  Polyphagia: {
    head: 'Polyphagia (Increased hunger) ',
    desc: 'Consistently feel hungry soon after eating may be due to your body is trying to desperately use the high blood sugar.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Choose nutrient-dense foods, eat regular, balanced meals & monitor blood sugar levels to manage hunger.',
      },
    ],
  },
  Polydipsia: {
    head: 'Polydipsia (Increased thirst)',
    desc: "Increased thirst beyond normal needs (polydipsia) could indicate the body's difficulty with sugar utilization.",
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Prioritize water, avoid sugary drinks, track your fluid intake and seek professional guidance.',
      },
    ],
  },
  'Blurred vision': {
    head: 'Blurred vision',
    desc: 'High blood sugar can damage the delicate blood vessels in your eyes, leading to blurry vision or even vision loss.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Prioritize eye health with regular check-ups, manage blood sugar levels diligently & consult an eye specialist for necessary interventions.',
      },
    ],
  },
  'Vaginal infection': {
    head: 'Vaginal infection',
    desc: 'Increased blood sugar can feed yeast growth, leading to recurrent vaginal infections.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Maintain good hygiene, manage blood sugar levels, wear breathable underwear & consult a healthcare provider for timely treatment of any infections.',
      },
    ],
  },
  Itching: {
    head: 'Itching',
    desc: 'Dry, itchy skin can be a side effect of high blood sugar & poor circulation.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: ' Keep skin moisturized, manage blood sugar levels & consult with a healthcare professional for personalized care & treatment.',
      },
    ],
  },
  Numbness: {
    head: 'Numbness',
    desc: 'High blood sugar can damage nerves, leading to numbness or tingling in hands & feet.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Control blood sugar levels, adopt a regular exercise routine & discuss symptom with a healthcare provider to address nerve damage.',
      },
    ],
  },
  'Delayed wound healing': {
    head: 'Delayed wound healing',
    desc: 'High blood sugar can impair blood flow & slow down wound healing, making you more susceptible to infections.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Keep wounds clean, manage blood sugar levels & seek prompt medical attention for any injuries or wounds to prevent complications.',
      },
    ],
  },
  Tiredness: {
    head: 'Tiredness',
    desc: "Feeling constantly fatigued can be a result of your body's struggle to process sugar for energy.",
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Ensure adequate rest, manage blood sugar levels through a balanced lifestyle & consult with healthcare professionals to address fatigue-related concerns.',
      },
    ],
  },
  'Diabetic Nephropathy': {
    head: 'Diabetic Nephropathy',
    desc: 'High blood sugar harms tiny vessels, affecting waste filtering & potentially leading to kidney failure.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Manage blood sugar levels, control blood pressure, adopt a kidney-friendly diet & undergo regular health check-ups.',
      },
    ],
  },
  'Diabetic Neuropathy': {
    head: 'Diabetic Neuropathy',
    desc: 'High sugar damages nerves, causing numbness, pain & even organ issues.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Control blood sugar levels, adopt a healthy lifestyle, manage pain symptoms with medications or other interventions & consult healthcare providers for regular monitoring & care.',
      },
    ],
  },
  'Diabetic Retinopathy': {
    head: 'Diabetic Retinopathy',
    desc: 'Leaky blood vessels causing blurry vision, floaters & even blindness. High blood sugar weakens eye vessels.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Prioritize eye health with regular check-ups, manage blood sugar levels diligently & consult an eye specialist for timely treatment to prevent or manage retinal issues',
      },
    ],
  },
  'Cardiac Diseases': {
    head: 'Cardiac diseases',
    desc: 'Diabetes increases risks of heart attack, stroke & other problems due to strained blood vessels & inflammation.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Adopt a heart-healthy lifestyle, manage blood sugar levels, control blood pressure & cholesterol & seek regular cardiovascular check-ups for early detection & intervention.',
      },
    ],
  },
  'Diabetic Ketoacidosis': {
    head: 'Diabetic Ketoacidosis',
    desc: 'Body burns fat for energy, creating toxic ketones, requiring immediate medical care.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Monitor blood sugar levels closely, stay hydrated, take insulin as prescribed & seek immediate medical attention if experiencing symptoms to prevent complications.',
      },
    ],
  },
  'Diabetic foot': {
    head: 'Diabetic foot',
    desc: 'Losing feeling & blood flow in your feet due to high sugar levels can lead to ulcers, infections & even amputation.',
    content: [
      {
        head: 'Recommendation',
        bullet: false,
        desc: 'Inspect feet regularly, practice good foot hygiene, wear comfortable shoes, manage blood sugar levels & consult healthcare professionals for preventive foot care & timely interventions.',
      },
    ],
  },
  FBG: {
    head: 'Fasting Blood Glucose Test (FBG)',
    desc: 'Measures blood sugar level after an overnight fast.',
    content: [
      {
        head: 'Normal Value',
        bullet: false,
        desc: '<100 mg/dL',
      },
    ],
  },
  OGTT: {
    head: 'Oral Glucose Tolerance Test/OGTT',
    desc: "Evaluates body's ability to process sugar by measuring blood sugar levels before &  after 2 hours consuming a sugary drink.",
    content: [
      {
        head: 'Normal Value',
        bullet: false,
        desc: '<140 mg/dL',
      },
    ],
  },
  PPG: {
    head: 'Post-prandial Glucose Test (PPG)',
    desc: 'Assess blood sugar level two hours after a meal.',
    content: [
      {
        head: 'Normal Value',
        bullet: false,
        desc: '< 5.7%',
      },
    ],
  },
  HbA1C: {
    head: 'Glycated Haemoglobin (HbA1C)',
    desc: 'An average of your blood sugar control over the past 2-3 months by measuring the percentage of hemoglobin (red blood cell protein) bonded to sugar.',
    content: [
      {
        head: 'Normal Value',
        bullet: false,
        desc: '<140 mg/dL',
      },
    ],
  },
  'MODY 1': {
    head: 'MODY 1',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'HNF4α (Hepatocyte Nuclear Factor 4 α)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '5%-10% Adolescent/early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nBirth weight less than 800g above normal, Neonatal diabetes, hyperinsulinemia hypoglycemia during infancy, low triglycerides',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Sensitive to sulfonylurea',
      },
    ],
  },
  'MODY 2': {
    head: 'MODY 2',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'GCK (Glucokinase)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '30%-50% among since birth',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'Glucose sensing defect',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: 'Stable mild fasting glucose',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'No medication, diet',
      },
    ],
  },
  'MODY 3': {
    head: 'MODY 3',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'HNF1α (Hepatocyte Nuclear Factor 1 α)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '30-65% among adolescent/early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nGlycosuria',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Sensitive to sulfonylurea',
      },
    ],
  },
  'MODY 4': {
    head: 'MODY 4',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'PDX1/IPF1 (Insulin promoter factor-1)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nHomozygote: permanent neonatal diabetes, pancreas agenesis',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Diet or Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 5': {
    head: 'MODY 5',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: ' HNF1β (Hepatocyte nuclear factor 1β)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<5% among adolescent',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nRenal malformations, Genito-urinary tract anomalies, pancreatic hypoplasia, low birth weight',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Insulin',
      },
    ],
  },
  'MODY 6': {
    head: 'MODY 6',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'NEUROD1 (Neurogenic differentiation)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nNeonatal diabetes, child or adult-onset diabetes neurological abnormalities',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 7': {
    head: 'MODY 7',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'KLF11 (Kruppel-Like Factor 11)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nSimilar to type 2 diabetes',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 8': {
    head: 'MODY 8',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'CEL (Bile salt dependent lipase-Carboxyl Ester Lipase)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'Pancreas endocrine and exocrine dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nExocrine dysfunction, lipomatosis',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 9': {
    head: 'MODY 9',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'PAX4 (Paired Box Gene 4)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'β-Cell dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nKetoacidosis-prone',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Diet or Oral Anti Diabetic Drug t or insulin',
      },
    ],
  },
  'MODY 10': {
    head: 'MODY 10',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'INS (Insulin gene)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'Insulin gene mutation',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nNeonatal diabetes, child or adult-onset diabetes',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 11': {
    head: 'MODY 11',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'BLK (B-Lymphocyte Kinase)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'Insulin secretion defect',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nOverweight, relative insulin secretion failure',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Diet or Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 12': {
    head: 'MODY 12',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'KCNJ11 (Potassium inwardly rectifying channel subfamily J member 11)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'ATP-sensitive potassium channel dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nHomozygote: neonatal diabetes',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Oral Anti Diabetic Drug or Insulin',
      },
    ],
  },
  'MODY 13': {
    head: 'MODY 13',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'ABCC8 (ATP-Binding Cassette transporter sub-family C member 8)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'ATP-sensitive potassium channel dysfunction',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nHomozygote: permanent neonatal diabetes,\nHeterozygote:  transient neonatal diabetes',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: ' Oral Anti Diabetic Drug (sulfonylurea)',
      },
    ],
  },
  'MODY 14': {
    head: 'MODY 14',
    content: [
      {
        bullet: false,
        head: 'MODY gene',
        desc: 'APPL1 (Adaptor protein, phosphoserine interacting with PH domain and leucine zipper 1)',
      },
      {
        bullet: false,
        head: 'Prevalence rate',
        desc: '<1% among early adult',
      },
      {
        bullet: false,
        head: 'Pathophysiology',
        desc: 'Insulin secretion defect',
      },
      {
        bullet: false,
        head: 'Other Characteristics/Symptoms',
        desc: '\nChild or adult-onset diabetes',
      },
      {
        bullet: false,
        head: 'Possible treatment',
        desc: 'Diet or Oral Anti Diabetic Drug or insulin',
      },
    ],
  },
  'Forward Neck Stretch': {
    head: 'Forward Neck Stretch',
    bullet: true,
    desc: ['Lengthen neck, ease tension. Tilt head down, hold 15-20  seconds.'],
    content: [
      {
        bullet: false,
        desc: 'Relieves pain, improves posture, increases range of motion.',
        head: 'Benefits',
      },
    ],
  },
  'Neck Rotation Stretch': {
    head: 'Neck Rotation Stretch',
    bullet: true,
    desc: [
      'Loosen tight muscles. Roll head in circles, both ways, 5 times each.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Reduces stiffness, improves flexibility, prevents headaches.',
        head: 'Benefits',
      },
    ],
  },
  'Upper Trapezius Stretch': {
    head: 'Upper Trapezius Stretch',
    bullet: true,
    desc: [
      'Release shoulder tension. Reach arm across body, pull head towards armpit, hold 15-20  seconds, switch sides.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Relieves shoulder pain, improves posture, reduces tension headaches.',
        head: 'Benefits',
      },
    ],
  },
  'Posterior Shoulder Stretch': {
    head: 'Posterior Shoulder Stretch',
    bullet: true,
    desc: [
      'Cross one of the arm across the chest, holding elbow with the other hand. Gently bend elbow to deepen the stretch and hold for 15-20 seconds for each sides.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Improves shoulder mobility, increases flexibility, reduces back pain.',
        head: 'Benefits',
      },
    ],
  },
  'Wing Span Stretch': {
    head: 'Wing Span Stretch',
    bullet: true,
    desc: [
      'Reach behind your back with one hand, then try to touch it with the other hand in the back. Hold for 15-20 seconds.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Opens up your chest, improves posture, increases shoulder mobility.',
        head: 'Benefits',
      },
    ],
  },
  'Wrist Stretch': {
    head: 'Wrist Stretch',
    bullet: true,
    desc: [
      'Relieve pain & tension. Extend arm, pull fingers back, hold 15-20  seconds, switch sides.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Reduces wrist pain, improves flexibility, prevents carpal tunnel syndrome.',
        head: 'Benefits',
      },
    ],
  },
  'Shoulder Rotation Stretch': {
    head: 'Shoulder Rotation Stretch',
    bullet: true,
    desc: [
      'Improve mobility. Make small circles with arms, forward & back, 10 times each.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Increases range of motion, improves flexibility, reduces risk of injury.',
        head: 'Benefits',
      },
    ],
  },
  'Forward Bend Stretch': {
    head: 'Forward Bend Stretch',
    bullet: true,
    desc: [
      'Lengthen spine & hamstrings. Hinge at hips, reach towards toes/floor, hold 15-20  seconds.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Improves hamstring flexibility, increases spinal mobility, reduces lower back pain.',
        head: 'Benefits',
      },
    ],
  },
  'Single Leg Forward Bend': {
    head: 'Single Leg Forward Bend',
    bullet: true,
    desc: [
      'Stretch hamstrings & glutes, one leg at a time. Stand tall, reach one leg back, fold forward, hold 15-20  seconds, switch sides.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Improves hamstring & glute flexibility, increases balance & coordination, reduces risk of injury.',
        head: 'Benefits',
      },
    ],
  },
  'Rotating Toe Touches': {
    head: 'Rotating Toe Touches',
    bullet: true,
    desc: [
      'Improve core stability & balance. Reach down, twist torso slightly to opposite side, hold a few seconds, switch sides, 5-10 repetitions per side.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Strengthens core muscles, improves balance & coordination, increases spinal mobility.',
        head: 'Benefits',
      },
    ],
  },
  'Standing Knee to Chest': {
    head: 'Standing Knee to Chest Stretch',
    bullet: true,
    desc: [
      'Gently stretch quads & hips. Bring knee to chest, hold 15-20  seconds, switch sides.',
    ],
    content: [
      {
        bullet: false,
        desc: ' Improves quad & hip flexibility, reduces lower back pain, increases hip mobility.',
        head: 'Benefits',
      },
    ],
  },
  'Ankle Rotate Stretch': {
    head: 'Ankle Rotate Stretch',
    bullet: true,
    desc: [
      'Improve mobility & prevent stiffness. Sit or stand tall, roll feet in circles, both ways, 10 times each.',
    ],
    content: [
      {
        bullet: false,
        desc: 'Increases ankle range of motion, improves balance & coordination, reduces risk of sprains.',
        head: 'Benefits',
      },
    ],
  },
  Bhujangasana: {
    head: 'Bhujangasana (Cobra Pose)',
    bullet: true,
    desc: ['Stimulates: Digestive organs, pancreas, abdominal muscles'],
    content: [
      {
        bullet: false,
        desc: 'Improves digestion, blood circulation, potential to increase insulin sensitivity.',
        head: 'Benefits',
      },
    ],
  },
  Sukhasana: {
    head: 'Sukhasana (Easy Pose)',
    bullet: true,
    desc: ['Focuses: Meditation, breathing, relaxation'],
    content: [
      {
        bullet: false,
        desc: 'Reduces stress, lowers cortisol levels (stress hormone linked to elevated blood sugar), promotes mindful eating.',
        head: 'Benefits',
      },
    ],
  },
  Padmasana: {
    head: 'Padmasana (Lotus Pose)',
    bullet: true,
    desc: ['Stretches: Hips, ankles, spine'],
    content: [
      {
        bullet: false,
        desc: 'Improves blood circulation, posture, and stability and may aid pancreatic function.',
        head: 'Benefits',
      },
    ],
  },
  Vajarasana: {
    head: 'Vajrasana (Thunderbolt Pose)',
    bullet: true,
    desc: ['Aids: Digestion, bowel movement, blood sugar control'],
    content: [
      {
        bullet: false,
        desc: 'Stimulates abdominal organs, improves blood flow, helps regulate post-meal blood sugar levels.',
        head: 'Benefits',
      },
    ],
  },
  Pawanmuktasana: {
    head: 'Pawanmuktasana (Wind Releasing Pose)',
    bullet: true,
    desc: ['Releases: Gas, abdominal discomfort, tension'],
    content: [
      {
        bullet: false,
        desc: 'Improves digestion, alleviates bloating, potential to reduce stress and regulate cortisol.',
        head: 'Benefits',
      },
    ],
  },
  Tadasana: {
    head: 'Tadasana (Mountain Pose)',
    bullet: true,
    desc: ['Strengthens: Core, posture, alignment'],
    content: [
      {
        bullet: false,
        desc: 'Enhances balance, stability, and overall body awareness, promotes mindful movement.',
        head: 'Benefits',
      },
    ],
  },
  Paschimottanasana: {
    head: 'Paschimottanasana (Seated Forward Bend)',
    bullet: true,
    desc: ['Stretches: Spine, hamstrings, shoulders'],
    content: [
      {
        bullet: false,
        desc: 'Improves flexibility, posture, stimulates internal organs, may aid digestion.',
        head: 'Benefits',
      },
    ],
  },
  Dhanurasana: {
    head: 'Dhanurasana (Bow Pose)',
    bullet: true,
    desc: ['Strengthens: Back, core, abdominal muscles'],
    content: [
      {
        bullet: false,
        desc: 'Improves circulation, stretches pancreas, potential to stimulate insulin production',
        head: 'Benefits',
      },
    ],
  },
  'Ardha Matsyendrasana': {
    head: 'Ardha Matsyendrasana (Lord of the Fishes Pose)',
    bullet: true,
    desc: ['Twists: Spine, abdomen, improves mobility'],
    content: [
      {
        bullet: false,
        desc: 'Stimulates internal organs, may regulate pancreatic function, promotes detoxification.',
        head: 'Benefits',
      },
    ],
  },
  Shavasna: {
    head: 'Shavasana (Corpse Pose)',
    bullet: true,
    desc: ['Relaxes: Deeply, reduces stress, calms the mind'],
    content: [
      {
        bullet: false,
        desc: 'Lowers cortisol, promotes restful sleep, aids in overall blood sugar management.',
        head: 'Benefits',
      },
    ],
  },
  Kapalbhati: {
    head: 'Kapalbhati (Skull Shining)',
    bullet: true,
    desc: [
      'Cleanses and energizes, potential to regulate blood sugar through improved breathing.',
    ],
  },
  'Nadi ShodhanPranaya': {
    head: 'Nadi Shodhan Pranayama (Alternate Nostril Breathing): ',
    bullet: true,
    desc: ['Balances energy flow, reduces stress, promotes overall wellbeing.'],
  },
  'Step 1. Pranamasana': {
    head: 'Pranamasana (Namaste Prayer)',
    bullet: true,
    desc: ['Stretches: Chest, shoulders, neck'],
    content: [
      {
        bullet: false,
        desc: 'Promotes relaxation, reducing stress hormones like cortisol, which can indirectly impact blood sugar control.',
        head: 'Benefits',
      },
    ],
  },
  'Step 12. Pranamasana': {
    head: 'Pranamasana (Namaste Prayer)',
    bullet: true,
    desc: ['Stretches: Chest, shoulders, neck'],
    content: [
      {
        bullet: false,
        desc: 'Promotes relaxation, reducing stress hormones like cortisol, which can indirectly impact blood sugar control.',
        head: 'Benefits',
      },
    ],
  },
  'Step 2. Hasta Uttasana': {
    head: 'Hasta Uttasana (Upward Salute):',
    bullet: true,
    desc: ['Stretches: Shoulders, chest, spine'],
    content: [
      {
        bullet: false,
        desc: 'Improves circulation, energy levels, and overall body awareness, potentially aiding in mindful movement and diabetes management.',
        head: 'Benefits',
      },
    ],
  },
  'Step 11. Hasta Uttasana': {
    head: 'Hasta Uttasana (Upward Salute):',
    bullet: true,
    desc: ['Stretches: Shoulders, chest, spine'],
    content: [
      {
        bullet: false,
        desc: 'Improves circulation, energy levels, and overall body awareness, potentially aiding in mindful movement and diabetes management.',
        head: 'Benefits',
      },
    ],
  },
  'Step 3. Padahastasana': {
    head: 'Padahastasana (Forward Fold):',
    bullet: true,
    desc: ['Stretches: Hamstrings, hips, back'],
    content: [
      {
        bullet: false,
        desc: 'Stimulates digestive organs, potentially aiding in better absorption and regulation of blood sugar levels.',
        head: 'Benefits',
      },
    ],
  },
  'Step 10. Padahastasana': {
    head: 'Padahastasana (Forward Fold):',
    bullet: true,
    desc: ['Stretches: Hamstrings, hips, back'],
    content: [
      {
        bullet: false,
        desc: 'Stimulates digestive organs, potentially aiding in better absorption and regulation of blood sugar levels.',
        head: 'Benefits',
      },
    ],
  },
  'Step 4. Ashwa Sanchalasana': {
    head: 'Ashwa Sanchalasana (Left Leg Lunge):',
    bullet: true,
    desc: ['Strengthens: Legs, hips, core'],
    content: [
      {
        bullet: false,
        desc: 'Enhances balance, coordination, and flexibility, also increasing physical activity which can improve insulin sensitivity.',
        head: 'Benefits',
      },
    ],
  },
  'Step 9. Ashwa Sanchalasana': {
    head: 'Ashwa Sanchalasana (Left Leg Lunge):',
    bullet: true,
    desc: ['Strengthens: Legs, hips, core'],
    content: [
      {
        bullet: false,
        desc: 'Enhances balance, coordination, and flexibility, also increasing physical activity which can improve insulin sensitivity.',
        head: 'Benefits',
      },
    ],
  },
  'Step 5.  Adho Mukha Svanasana': {
    head: 'Adho Mukha Svanasana (Downward Dog):',
    bullet: true,
    desc: ['Strengthens: Back, arms, core'],
    content: [
      {
        bullet: false,
        desc: ' Improves circulation and digestion, contributing to overall metabolic health and potentially aiding in blood sugar control.',
        head: 'Benefits',
      },
    ],
  },
  'Step 8. Adho Mukha  Svanasana': {
    head: 'Adho Mukha Svanasana (Downward Dog):',
    bullet: true,
    desc: ['Strengthens: Back, arms, core'],
    content: [
      {
        bullet: false,
        desc: ' Improves circulation and digestion, contributing to overall metabolic health and potentially aiding in blood sugar control.',
        head: 'Benefits',
      },
    ],
  },
  'Step 6. Ashtanga Namaskar': {
    head: 'Ashtanga Namaskar (Eight Limbed Pose):',
    bullet: true,
    desc: ['Knee, cheat and chin pose'],
    content: [
      {
        bullet: false,
        desc: 'Provides a full-body workout, improving flexibility, circulation, and overall well-being, which can positively impact diabetes management.',
        head: 'Benefits',
      },
    ],
  },
  'Step 7.Bhujangasana': {
    head: 'Bhujangasana (Cobra Pose)',
    bullet: true,
    desc: ['Strengthens: Back, core, shoulders'],
    content: [
      {
        bullet: false,
        desc: 'Stimulates digestive organs and pancreas, potentially improving insulin sensitivity and blood sugar control.',
        head: 'Benefits',
      },
    ],
  },
};

export default popUpContent;
