import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-600 font-bold text-lg mt-5">
          🚨 Something went wrong! Please try again later. 🚨
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
