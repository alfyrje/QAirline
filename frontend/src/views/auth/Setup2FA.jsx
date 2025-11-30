import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../partials/Header';
import { setup2FA, enable2FA } from '../../utils/auth';
import { useAuthStore } from '../../store/auth';
import './login.css';

export default function Setup2FA() {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(true);
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [step, setStep] = useState(1); // 1: Setup, 2: Recovery Codes
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useAuthStore((state) => state.user());
  const user_id = location.state?.user_id || sessionStorage.getItem('temp_user_id') || authUser?.user_id;
  const pre_token = sessionStorage.getItem('pre_token');

  useEffect(() => {
    if (!user_id) {
      navigate('/login');
      return;
    }

    // Load QR code khi component mount
    loadQRCode();
  }, [user_id, navigate]);

  const loadQRCode = async () => {
    setSetupLoading(true);
    setError('');
    try {
      const response = await setup2FA(user_id, pre_token);
      if (response.status === 200) {
        setQrCode(response.qr_code);
        setSecret(response.secret);
      } else {
        setError(response.detail || 'Không thể tải QR code. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải QR code.');
    } finally {
      setSetupLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (code.length !== 6) {
      setError('Mã 2FA phải có 6 chữ số.');
      setLoading(false);
      return;
    }

    try {
      const response = await enable2FA(user_id, code, pre_token);
      if (response.status === 200) {
        setRecoveryCodes(response.recovery_codes || []);
        setStep(2);
      } else {
        setError(response.detail || 'Mã 2FA không đúng. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi kích hoạt 2FA.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([recoveryCodes.join("\n")], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "qairline-recovery-codes.txt";
    document.body.appendChild(element);
    element.click();
  }

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    alert("Đã sao chép mã bí mật!");
  }

  const handleFinish = () => {
    sessionStorage.removeItem('temp_user_id');
    sessionStorage.removeItem('pre_token');
    navigate('/profile');
  }

  return (
    <>
      <section className="login-container">
        <Header />
        <div className="login-form-container">
          <div className="login-form">
            <div className="login-form-icon">
              <img src='/icons/hoa.png' width='50px' height='50px' alt='logo' />
            </div>

            {step === 1 ? (
              <>
                <h3>Thiết lập 2FA</h3>
                <p>
                  Quét mã QR bằng ứng dụng xác thực (Google Authenticator, Microsoft Authenticator, v.v.)
                </p>

                {setupLoading ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Đang tải QR code...</p>
                  </div>
                ) : qrCode ? (
                  <div style={{ textAlign: 'center', marginBottom: '20px', width: '100%' }}>
                    <div className="qr-container">
                      <img
                        src={qrCode}
                        alt="QR Code for 2FA"
                        className="qr-image"
                      />
                    </div>
                    {secret && (
                      <div className="secret-key-box">
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Setup key (nếu không quét được QR):</p>
                        <span className="secret-key-code">{secret}</span>
                        <button
                          type="button"
                          onClick={handleCopySecret}
                          className="btn-link"
                          style={{ fontSize: '12px', marginTop: '5px' }}
                        >
                          Sao chép
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: 'red' }}>Không thể tải QR code.</p>
                    <button
                      onClick={loadQRCode}
                      className="btn-link"
                    >
                      Thử lại
                    </button>
                  </div>
                )}

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <div className="login-input_box">
                    <label htmlFor="code">Nhập mã xác thực</label>
                    <input
                      type="text"
                      id="code"
                      placeholder="000000"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      maxLength="6"
                      className="input-code"
                    />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading || code.length !== 6}>
                    {loading ? 'Đang xác thực...' : 'Kích hoạt 2FA'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3>Mã khôi phục</h3>
                <div className="warning-box">
                  <strong>Quan trọng:</strong> Vui lòng lưu lại các mã này ở nơi an toàn. Bạn có thể sử dụng chúng để đăng nhập nếu mất thiết bị xác thực.
                </div>

                <div className="recovery-codes-grid">
                  {recoveryCodes.map((code, index) => (
                    <div key={index} className="recovery-code-item">
                      {code}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleDownloadCodes}
                  className="btn-secondary"
                >
                  Tải xuống mã khôi phục
                </button>

                <button onClick={handleFinish} className="btn-primary">
                  Tôi đã lưu mã của mình
                </button>
              </>
            )}

            {step === 1 && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('temp_user_id');
                    navigate('/login');
                  }}
                  className="btn-link"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
