import { Component } from "react";
class ErrorBoundary extends Component {
    state = { hasError: false, redirect: false };
    static getDerivedStateFromError() {
      return { hasError: true };
    }
    componentDidCatch(error, info) {
      console.error("ErrorBoundary caught an error", error, info);
    }
    componentDidUpdate() {
      if (this.state.hasError) {
        setTimeout(() => this.setState({ redirect: true }), 5000);
      }
    }
    render() {
      if (this.state.redirect) {
        return
      } else if (this.state.hasError) {
        return (
          <h2>
            There was an error with this listing. Click here{" "}
            to back to the home page or wait five seconds.
          </h2>
        );
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
  