import { SkillsFrequencyTimeline } from "@/components/charts/skills_frequency_timeline";
import { SkillSentimentChart } from "@/components/charts/skills_sentiment_chart";
import { SkillSentimentFrequencyTimeline } from "@/components/charts/skills_sentiment_frequency_timeline";
import { TestCaseRatioChart } from "@/components/charts/test_case_ratio_chart";
import Dropdown from "@/components/dropdown";
import "../lib/chart_registration";
import { PRQualityTimeline } from "@/components/charts/pr_quality_timeline";
import { PRImpactTimeline } from "@/components/charts/pr_impact_timeline";

export default function Home() {
  const userDropwdownOptions = [
    { value: "1", label: "User 1" },
    { value: "2", label: "User 2" },
  ];
  const periodDropdownOptions = [
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "quarter", label: "quarter" },
    { value: "year", label: "year" },
  ];

  const insights = [
    "You have been actively contributing to merge requests related to Android development and its associated libraries, especially focusing on Android, Java, Kotlin, and Git. ",
    "Your recent contributions are well-received, with a positive sentiment towards your skills in Kotlin, Code Review, Android and Git. ",
    "There is a need to improve your skills in Java, with negative feedback related to its use in specific contexts. ",
    "While you have demonstrated understanding in areas like UI, Markdown and Shell Scripting,  negative feedback suggests there is room for improvement in these areas. ",
    "Consider addressing the feedback received in areas like Java, UI, Markdown, and Shell Scripting for better merge request contributions.",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 p-8 md:p-24">
      <div className="mt-8 flex flex-col md:flex-row w-full md:max-w-7xl justify-evenly bg-gray-100 p-4 rounded-md">
        <Dropdown options={userDropwdownOptions} className="flex-1 mx-8 my-2" />
        <Dropdown
          options={periodDropdownOptions}
          className="flex-1 mx-8 my-2"
        />
      </div>
      <div className="w-full h-96 max-w-7xl flex justify-center">
        <PRImpactTimeline className="w-full max-w-2xl p-4" />
        <PRQualityTimeline className="w-full max-w-2xl p-4" />
      </div>
      <div className="w-full h-96 max-w-7xl flex justify-center">
        <SkillSentimentChart className="w-full max-w-2xl p-4" />
        <TestCaseRatioChart className="w-full max-w-2xl p-4" />
      </div>
      <div className="w-full h-96 max-w-7xl flex justify-center">
        <SkillSentimentFrequencyTimeline className="w-full max-w-2xl p-4" />
        <SkillsFrequencyTimeline className="w-full max-w-2xl, p-4" />
      </div>
      <div className="w-full max-w-7xl m-4 bg-gray-100 p-4 rounded-md">
        <h3 className="font-semibold text-lg">Insights:</h3>
        <ol className="ml-8 mt-2 list-decimal list-outside">
          {insights.map((item, index) => (
            <li key={index} className="text-sm list-item">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
