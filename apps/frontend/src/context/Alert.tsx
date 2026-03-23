import { AlertProps, Alert as AlertComponent } from '@/components/ui/Alert';
import { ReactNode, createContext, useContext, useState } from 'react';

type Alert = Omit<AlertProps, 'isOpen' | 'setIsOpen'>;

type AlertContextProps = {
  children: ReactNode;
};

type AlertContextValue = {
  showAlert: (alert: Alert) => void;
};

const AlertContext = createContext<AlertContextValue | null>(null);

export const Alert: React.FC<AlertContextProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);

  const showAlert = (alert: Alert) => {
    setCurrentAlert(alert);
    setIsOpen(true);
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      {currentAlert && (
        <AlertComponent
          {...currentAlert}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
};
