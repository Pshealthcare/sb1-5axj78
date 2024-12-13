export interface Settings {
  general: {
    hospitalName: string;
    address: string;
    contactNumber: string;
    email: string;
    taxNumber?: string;
  };
  security: {
    passwordExpiryDays: number;
    sessionTimeoutMinutes: number;
    enforceStrongPasswords: boolean;
    twoFactorAuth: boolean;
  };
  backup: {
    autoBackupFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
    encryptBackups: boolean;
  };
  invoice: {
    template: {
      sections: {
        id: string;
        name: string;
        enabled: boolean;
        order: number;
      }[];
      header: {
        showLogo: boolean;
        showTitle: boolean;
        titleSize: string;
        alignment: string;
      };
      styling: {
        primaryColor: string;
        fontFamily: string;
        fontSize: string;
        borderStyle: string;
      };
    };
  };
}