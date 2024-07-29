import * as React from 'react';

interface EmailTemplateProps {
  link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  link
}) => (
  <div>
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{ borderCollapse: 'collapse', width: '100%', height: '100%', textAlign: 'center' }}
    >
      <tbody>
        <tr>
          <td align="center" style={{ padding: '20px 0' }}>
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                borderCollapse: 'collapse',
                backgroundColor: '#1a202c',
                border: '2px solid #2d3748',
                borderRadius: '8px',
                width: 'auto',
                maxWidth: '600px',
                margin: 'auto',
                padding: '16px',
              }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: '20px'}}>
                    <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '24px' }}>Hoşgeldiniz!</h1>
                    <p style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>
                      Sizi aramızda görmekten mutluluk duyuyoruz.
                    </p>
                    <p style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>
                      Mesajlaşmaya başlamak için lütfen mailinizi doğrulayınız.
                    </p>
                    <a
                      href={link}
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#ff8c00',
                        color: 'white',
                        fontSize: '18px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        border: '1px solid #ff8c00',
                      }}
                    >
                      Doğrula
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
