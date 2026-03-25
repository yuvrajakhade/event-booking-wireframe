import React from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, UserPlus } from "lucide-react";

type LoginScreenProps = {
  onLogin: () => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [signUpData, setSignUpData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;
    onLogin();
  };

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.phone ||
      !signUpData.password ||
      !signUpData.confirmPassword
    )
      return;
    if (signUpData.password !== signUpData.confirmPassword) return;
    onLogin();
  };

  return (
    <section className="login-shell">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to manage your events</p>
        </div>

        {!showSignUp ? (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="signup-button"
              onClick={() => setShowSignUp(true)}
            >
              Don't have an account? Sign Up
            </button>
          </form>
        ) : (
          <div className="register-shell">
            <div className="register-topbar">
              <button
                type="button"
                className="icon-btn-ghost"
                onClick={() => setShowSignUp(false)}
                aria-label="Back"
              >
                <ArrowLeft size={22} />
              </button>
              <h2>Register</h2>
              <span />
            </div>

            <div className="register-badge">
              <UserPlus size={34} />
            </div>

            <div className="register-head">
              <h1>Create Account</h1>
              <p>Join us to start managing events</p>
            </div>

            <form className="login-form register-form" onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={signUpData.name}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                  placeholder="yourname@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="signup-phone"
                  type="tel"
                  value={signUpData.phone}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password" className="form-label">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                  placeholder="Create a strong password"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Re-enter your password"
                  required
                  className="form-input"
                />
              </div>

              <p className="terms-row">
                <ShieldCheck size={16} />
                By registering, you agree to our Terms & Conditions
              </p>

              <button
                type="submit"
                className="login-button register-create-btn"
              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        <div className="login-footer">
          <p>
            Powered by <strong>SVOJUS PALACE</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
