import React from "react";
import { Form, Button } from "react-bootstrap";

function Step1UserDetails({
  fullName,
  setFullName,
  phone,
  setPhone,
  phoneError,
  setPhoneError,
  otp,
  setOtp,
  otpError,
  setOtpError,
  otpSent,
  sending,
  verifying,
  canResendIn,
  onSendOtp,
  onVerifyOtp,
  otpVerified,
  otpVerifyMsg,
  onNext,
}) {
  return (
    <>
      <style>{`
        :root {
          --primary-green: #16a34a;
          --primary-green-dark: #15803d;
          --primary-green-light: #22c55e;
          --accent-green: #059669;
          --accent-green-light: #10b981;
          --text-dark: #0f172a;
          --border-light: #e2e8f0;
        }

        /* ✅ Gradient matching your image */
        .gradient-heading {
          background: linear-gradient(
            135deg,
            #0bbf7a,
            #0a9f6e,
            #067a58,
            #065f46
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .step1-card-content {
          padding: 28px;
        }

        .step1-title {
          font-weight: 800;
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 24px;
        }

        .step1-label {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .step1-input {
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-light);
          transition: all 0.2s ease;
        }

        .step1-input:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 0.15rem rgba(22, 163, 74, 0.15);
        }

        .otp-row {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .otp-row .form-control {
          flex: 1;
          min-width: 140px;
        }

        .step1-btn {
          border-radius: 10px;
          font-weight: 600;
          padding: 9px 14px;
          transition: all 0.2s ease;
        }

        .btn-send {
          border: 1px solid var(--primary-green);
          color: var(--primary-green);
          background: white;
        }

        .btn-send:hover {
          background: var(--primary-green);
          color: white;
        }

        .btn-verify {
          background: var(--accent-green);
          border: none;
        }

        .btn-verify:hover {
          background: var(--primary-green-dark);
          transform: translateY(-1px);
        }

        .btn-next {
          background: linear-gradient(
            135deg,
            var(--primary-green),
            var(--primary-green-light)
          );
          border: none;
          padding: 10px 24px;
        }

        .btn-next:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(22, 163, 74, 0.25);
        }

        .next-btn-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 28px;
        }

        @media (max-width: 576px) {
          .otp-row {
            flex-direction: column;
            align-items: stretch;
          }

          .next-btn-container {
            justify-content: center;
          }
        }
      `}</style>

      <div className="step1-card-content">

        {/* ✅ Single gradient heading */}
        <h5 className="step1-title gradient-heading">
          Your Information
        </h5>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="step1-label">
              Full Name 
            </Form.Label>
            <Form.Control
              className="step1-input"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="step1-label">
              Phone Number
            </Form.Label>
            <Form.Control
              className="step1-input"
              type="tel"
              placeholder="e.g., 9876543210 or +91-9876543210"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              isInvalid={!!phoneError}
            />
            <Form.Control.Feedback type="invalid">
              {phoneError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="step1-label">
              Verify Phone Number
            </Form.Label>

            <div className="otp-row">
              <Button
                className="step1-btn btn-send"
                type="button"
                onClick={onSendOtp}
                disabled={sending || canResendIn > 0}
              >
                {sending
                  ? "Sending..."
                  : canResendIn > 0
                  ? `Resend OTP in ${canResendIn}s`
                  : "Send OTP"}
              </Button>

              <Form.Control
                className="step1-input"
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setOtp(v);
                  setOtpError("");
                }}
                isInvalid={!!otpError}
                disabled={!otpSent || otpVerified}
              />

              <Button
                className="step1-btn btn-verify"
                type="button"
                onClick={onVerifyOtp}
                disabled={!otpSent || verifying || otpVerified}
              >
                {otpVerified
                  ? "Verified ✓"
                  : verifying
                  ? "Verifying..."
                  : "Verify"}
              </Button>
            </div>

            {otpError && (
              <div className="invalid-feedback d-block">
                {otpError}
              </div>
            )}

            {otpSent && !otpError && !otpVerified && (
              <small className="text-success">
                OTP sent successfully to your mobile number.
              </small>
            )}

            {otpVerified && otpVerifyMsg && (
              <small className="text-success d-block mt-1">
                {otpVerifyMsg}
              </small>
            )}
          </Form.Group>

          <div className="next-btn-container">
            <Button
              className="step1-btn btn-next"
              type="button"
              onClick={onNext}
              disabled={!otpVerified}
            >
              Next →
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Step1UserDetails;