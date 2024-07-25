import * as React from 'react';

interface EmailTemplateProps {
  link:string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  link
}) => (
  <div>
    <h1>Welcome!</h1>
    <div>Please Confirm Email: {link}</div>
  </div>
);
