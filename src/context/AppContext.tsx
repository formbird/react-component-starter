/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { FormDocument, FormTemplate } from '@formbird/types';

// Define the context state interface
interface AppContextState {
  // FormBird specific props
  document: FormDocument;
  template: FormTemplate;
  fieldValue: unknown;
  fieldName: string;
  formParameters: Record<string, unknown>;
  responsiveLayout: string;
  message: string;
  componentDefinition: Record<string, unknown>;
  componentProps: Record<string, unknown>;
  
  // App-specific state
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: string;
  
  // Actions
  updateFieldValue: (value: unknown) => void;
  updateMessage: (message: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleTheme: () => void;
  setLanguage: (language: string) => void;
  updateComponentProps: (props: Record<string, unknown>) => void;
}

// Create the context
const AppContext = createContext<AppContextState | undefined>(undefined);

// Provider component props
interface AppProviderProps {
  children: ReactNode;
  // Optional initial props that can be passed from the custom element
  initialDocument?: FormDocument;
  initialTemplate?: FormTemplate;
  initialFieldValue?: unknown;
  initialFieldName?: string;
  initialFormParameters?: Record<string, unknown>;
  initialResponsiveLayout?: string;
  initialMessage?: string;
  initialComponentDefinition?: Record<string, unknown>;
  initialComponentProps?: Record<string, unknown>;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ 
  children,
  initialDocument = {} as FormDocument,
  initialTemplate = {} as FormTemplate,
  initialFieldValue = null,
  initialFieldName = '',
  initialFormParameters = {},
  initialResponsiveLayout = '',
  initialMessage = '',
  initialComponentDefinition = {},
  initialComponentProps = {}
}) => {
  // FormBird state
  const [document, setDocument] = useState<FormDocument>(initialDocument);
  const [template, setTemplate] = useState<FormTemplate>(initialTemplate);
  const [fieldValue, setFieldValue] = useState<unknown>(initialFieldValue);
  const [fieldName, setFieldName] = useState<string>(initialFieldName);
  const [formParameters, setFormParameters] = useState<Record<string, unknown>>(initialFormParameters);
  const [responsiveLayout, setResponsiveLayout] = useState<string>(initialResponsiveLayout);
  const [message, setMessage] = useState<string>(initialMessage);
  const [componentDefinition, setComponentDefinition] = useState<Record<string, unknown>>(initialComponentDefinition);
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>(initialComponentProps);
  
  // App-specific state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<string>('en');

  // Actions
  const updateFieldValue = (value: unknown) => {
    setFieldValue(value);
    // You can add additional logic here, like validation or API calls
  };

  const updateMessage = (message: string) => {
    setMessage(message);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setErrorState = (error: string | null) => {
    setError(error);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLanguageState = (language: string) => {
    setLanguage(language);
  };

  const updateComponentProps = (props: Record<string, unknown>) => {
    setComponentProps(props);
  };

  const contextValue: AppContextState = {
    // FormBird props
    document,
    template,
    fieldValue,
    fieldName,
    formParameters,
    responsiveLayout,
    message,
    componentDefinition,
    componentProps,
    
    // App state
    isLoading,
    error,
    theme,
    language,
    
    // Actions
    updateFieldValue,
    updateMessage,
    setLoading,
    setError: setErrorState,
    toggleTheme,
    setLanguage: setLanguageState,
    updateComponentProps,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Export the context for direct access if needed
export { AppContext };
