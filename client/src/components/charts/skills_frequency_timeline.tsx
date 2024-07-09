"use client";
import { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

export function SkillsFrequencyTimeline({ className }: { className?: string }) {
  const data: {
    skill: string;
    frequency: Record<string, number>;
    insights: string[];
    sentimentFrequency: Record<
      "Positive" | "Negative" | "Neutral",
      Record<string, number>
    >;
  }[] = [
    {
      skill: "Android Development",
      frequency: {
        "2024-03-01T00:00:00.000+05:30": 16,
        "2024-04-01T00:00:00.000+05:30": 18,
        "2024-05-01T00:00:00.000+05:30": 17,
        "2024-06-01T00:00:00.000+05:30": 5,
        "2024-07-01T00:00:00.000+05:30": 0,
      },
      sentimentFrequency: {
        Positive: {
          "2024-03-01T00:00:00.000+05:30": 3,
          "2024-04-01T00:00:00.000+05:30": 2,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Negative: {
          "2024-03-01T00:00:00.000+05:30": 1,
          "2024-04-01T00:00:00.000+05:30": 1,
          "2024-05-01T00:00:00.000+05:30": 2,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Neutral: {
          "2024-03-01T00:00:00.000+05:30": 12,
          "2024-04-01T00:00:00.000+05:30": 15,
          "2024-05-01T00:00:00.000+05:30": 15,
          "2024-06-01T00:00:00.000+05:30": 5,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
      },
      insights: [
        "Your expertise in Android Development is well-recognized, contributing to the positive sentiment.",
        "The trend shows an increase in activity and a slight drop in feedback on your Android Development skills. Stay up to date with the latest developments in the field.",
        "Consider leveraging the positive feedback you received on your Android Development skills in recent months.",
        "There is an opportunity to expand your knowledge of Android Development by exploring new areas and contributing to the project in new ways.",
        "Continue refining your Android Development skills to become a more valuable contributor to the project.",
      ],
    },
    {
      skill: "F-Droid",
      frequency: {
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 6,
        "2024-05-01T00:00:00.000+05:30": 9,
        "2024-06-01T00:00:00.000+05:30": 1,
        "2024-07-01T00:00:00.000+05:30": 0,
      },
      sentimentFrequency: {
        Positive: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Negative: {
          "2024-03-01T00:00:00.000+05:30": 1,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 2,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Neutral: {
          "2024-03-01T00:00:00.000+05:30": 5,
          "2024-04-01T00:00:00.000+05:30": 6,
          "2024-05-01T00:00:00.000+05:30": 7,
          "2024-06-01T00:00:00.000+05:30": 1,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
      },
      insights: [
        "Your contributions to F-Droid have been consistent, demonstrating your commitment to the project.",
        "The feedback on your F-Droid skills has been predominantly neutral. There's room for improvement in this area.",
        "Your F-Droid knowledge has been valuable, but consider expanding your expertise to other areas as well.",
        "There has been a slight decrease in activity around F-Droid in recent months. Keep abreast of the latest developments in F-Droid and contribute to maintaining your knowledge base.",
        "Continue engaging with F-Droid and strive to improve the feedback you receive on your knowledge and contributions.",
      ],
    },
    {
      skill: "Kotlin",
      frequency: {
        "2024-03-01T00:00:00.000+05:30": 7,
        "2024-04-01T00:00:00.000+05:30": 8,
        "2024-05-01T00:00:00.000+05:30": 7,
        "2024-06-01T00:00:00.000+05:30": 4,
        "2024-07-01T00:00:00.000+05:30": 0,
      },
      sentimentFrequency: {
        Positive: {
          "2024-03-01T00:00:00.000+05:30": 4,
          "2024-04-01T00:00:00.000+05:30": 3,
          "2024-05-01T00:00:00.000+05:30": 3,
          "2024-06-01T00:00:00.000+05:30": 1,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Negative: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Neutral: {
          "2024-03-01T00:00:00.000+05:30": 3,
          "2024-04-01T00:00:00.000+05:30": 5,
          "2024-05-01T00:00:00.000+05:30": 4,
          "2024-06-01T00:00:00.000+05:30": 3,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
      },
      insights: [
        "Your Kotlin skills are highly valued, evident in the positive feedback.",
        "You have consistently utilized Kotlin across various merge requests and comments.",
        "Your proficiency in Kotlin has been instrumental in resolving issues and enhancing functionalities.",
        "Consider contributing more to projects leveraging Kotlin to further strengthen your expertise.",
        "Explore advanced Kotlin concepts and libraries for more impactful contributions.",
      ],
    },
    {
      skill: "Java",
      frequency: {
        "2024-03-01T00:00:00.000+05:30": 9,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 6,
        "2024-06-01T00:00:00.000+05:30": 5,
        "2024-07-01T00:00:00.000+05:30": 0,
      },
      sentimentFrequency: {
        Positive: {
          "2024-03-01T00:00:00.000+05:30": 3,
          "2024-04-01T00:00:00.000+05:30": 2,
          "2024-05-01T00:00:00.000+05:30": 1,
          "2024-06-01T00:00:00.000+05:30": 2,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Negative: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 1,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Neutral: {
          "2024-03-01T00:00:00.000+05:30": 6,
          "2024-04-01T00:00:00.000+05:30": 7,
          "2024-05-01T00:00:00.000+05:30": 5,
          "2024-06-01T00:00:00.000+05:30": 2,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
      },
      insights: [
        "You have consistently demonstrated your expertise in Java, contributing to the project's success.",
        "Your understanding of Java is appreciated, as evident in the positive sentiment surrounding your contributions.",
        "Maintain your strong Java foundation to contribute effectively to the project.",
        "Explore newer Java features and best practices to improve your code quality and efficiency.",
        "Consider focusing on more complex Java-related tasks to further enhance your skills and impact.",
      ],
    },
    {
      skill: "SQL",
      frequency: {
        "2024-03-01T00:00:00.000+05:30": 0,
        "2024-04-01T00:00:00.000+05:30": 0,
        "2024-05-01T00:00:00.000+05:30": 1,
        "2024-06-01T00:00:00.000+05:30": 0,
        "2024-07-01T00:00:00.000+05:30": 0,
      },
      sentimentFrequency: {
        Positive: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 1,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Negative: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Neutral: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
      },
      insights: [
        "Your experience with SQL is valuable, contributing to your positive contribution in version sorting.",
        "You have successfully applied SQL to improve the app's functionality.",
        "Focus on expanding your knowledge of SQL for more complex database interactions.",
        "Explore advanced SQL techniques to optimize queries and database performance.",
        "Contribute to areas that require SQL expertise for a greater impact on the project.",
      ],
    },
    {
      skill: "Python",
      frequency: {
        "2024-03-01T00:00:00.000+05:30": 1,
        "2024-04-01T00:00:00.000+05:30": 0,
        "2024-05-01T00:00:00.000+05:30": 0,
        "2024-06-01T00:00:00.000+05:30": 0,
        "2024-07-01T00:00:00.000+05:30": 0,
      },
      sentimentFrequency: {
        Positive: {
          "2024-03-01T00:00:00.000+05:30": 1,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Negative: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
        Neutral: {
          "2024-03-01T00:00:00.000+05:30": 0,
          "2024-04-01T00:00:00.000+05:30": 0,
          "2024-05-01T00:00:00.000+05:30": 0,
          "2024-06-01T00:00:00.000+05:30": 0,
          "2024-07-01T00:00:00.000+05:30": 0,
        },
      },
      insights: [
        "You have demonstrated basic Python skills, contributing to the repository management.",
        "Expanding your Python knowledge can open doors to automating tasks and enhancing project efficiency.",
        "Explore Python libraries for specific use cases to streamline your workflow.",
        "Contribute to areas that leverage Python for a more diverse skillset and impact.",
        "Consider creating a project or contributing to an open-source project involving Python to gain further experience.",
      ],
    },
  ];

  const chartData = {
    labels: Object.keys(data[0].frequency),
    datasets: data.map((item) => ({
      label: item.skill,
      data: Object.keys(item.frequency).map((key) => item.frequency[key]),
    })),
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      title: {
        display: true,
        text: "Skill Frequency Timeline",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = (context.raw as number).toPrecision(2);
            return `${label}: ${value}`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Frequency",
        },
      },
    },
  };

  return <Line className={className} data={chartData} options={options} />;
}
