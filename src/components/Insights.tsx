import { useInsights } from "../hooks/useInsights";
import { useTheme } from "../context/ThemeConetxt";

const Insights = () => {
  const { largestExpense, highestSpendingCategory, percentChange } = useInsights();
  const { theme } = useTheme();

  const isLess = percentChange < 0;

  // Theme-aware colors
  const colors = theme === "dark"
    ? {
        background: "#1F2937", // gray-800
        cardBackground: "#111827", // gray-900
        text: "#F3F4F6", // gray-100
        textSecondary: "#D1D5DB", // gray-300
        accent: "#60A5FA", // blue-400
        positive: "#10B981", // emerald-500
        negative: "#EF4444", // red-500
        border: "#374151", // gray-700
      }
    : {
        background: "#FFFFFF",
        cardBackground: "#F9FAFB", // gray-50
        text: "#111827", // gray-900
        textSecondary: "#6B7280", // gray-500
        accent: "#3B82F6", // blue-500
        positive: "#059669", // emerald-600
        negative: "#DC2626", // red-600
        border: "#E5E7EB", // gray-200
      };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        padding: "1.5rem",
        borderRadius: "0.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "1.5rem",
          color: colors.text,
        }}
      >
        Insights
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {/* Largest Expense Card */}
        <div
          style={{
            backgroundColor: colors.cardBackground,
            padding: "1.25rem",
            borderRadius: "0.375rem",
            border: `1px solid ${colors.border}`,
            boxShadow: theme === "dark" ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Largest Expense
          </p>
          <p
            style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              color: colors.accent,
              marginBottom: "0.25rem",
            }}
          >
            ${largestExpense.amount.toLocaleString()}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: colors.textSecondary,
            }}
          >
            {largestExpense.category || "N/A"}
          </p>
        </div>

        {/* Highest Spending Category Card */}
        <div
          style={{
            backgroundColor: colors.cardBackground,
            padding: "1.25rem",
            borderRadius: "0.375rem",
            border: `1px solid ${colors.border}`,
            boxShadow: theme === "dark" ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Top Spending Category
          </p>
          <p
            style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              color: colors.accent,
              marginBottom: "0.25rem",
            }}
          >
            {highestSpendingCategory.category || "N/A"}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: colors.textSecondary,
            }}
          >
            ${highestSpendingCategory.amount?.toLocaleString() || "0"}
          </p>
        </div>

        {/* Month Comparison Card */}
        <div
          style={{
            backgroundColor: colors.cardBackground,
            padding: "1.25rem",
            borderRadius: "0.375rem",
            border: `1px solid ${colors.border}`,
            boxShadow: theme === "dark" ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Month Comparison
          </p>
          <p
            style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              color: isLess ? colors.positive : colors.negative,
              marginBottom: "0.25rem",
            }}
          >
            {Math.abs(percentChange).toFixed(1)}%
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: colors.textSecondary,
            }}
          >
            {isLess ? "Less" : "More"} than last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;