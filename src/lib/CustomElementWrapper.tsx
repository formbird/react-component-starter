import { createRoot } from 'react-dom/client';
import type { FormComponent, FormDocument, FormTemplate } from '@formbird/types';
import Handlebars from 'handlebars';
import type { ComponentType } from 'react';

export const convertToCustomElement = (name: string, Component: ComponentType<Record<string, unknown>>) => {
  class FtWrapper extends HTMLElement implements FormComponent {
    private _document: FormDocument = {} as FormDocument;
    private _template: FormTemplate = {} as FormTemplate;
    private _fieldValue: unknown = null;
    private _fieldName: string = '';
    private _formParameters: Record<string, unknown> = {};
    private _key: number = 0;
    private _message: string = '';
    private _responsiveLayouts: string = '';
    private _componentDefinition: Record<string, unknown> = {};

    mountPoint: HTMLDivElement | null = null;
    root: ReturnType<typeof createRoot> | null = null;

    // Getter for document that reads from attribute
    get document(): FormDocument {
      if (!this._document || Object.keys(this._document).length === 0) {
        const attrValue = this.getAttribute('document');
        if (attrValue) {
          try {
            this._document = JSON.parse(attrValue);
          } catch (error) {
            console.error('Error parsing document:', error);
            this._document = {} as FormDocument;
          }
        }
      }
      return this._document;
    }

    set document(value: FormDocument) {
      this._document = value;
    }

    // Getter for template that reads from attribute
    get template(): FormTemplate {
      if (!this._template || Object.keys(this._template).length === 0) {
        const attrValue = this.getAttribute('template');
        if (attrValue) {
          try {
            this._template = JSON.parse(attrValue);
          } catch (error) {
            console.error('Error parsing template:', error);
            this._template = {} as FormTemplate;
          }
        }
      }
      return this._template;
    }

    set template(value: FormTemplate) {
      this._template = value;
    }

    // Getter for fieldValue that reads from attribute
    get fieldValue(): unknown {
      if (this._fieldValue === null) {
        const attrValue = this.getAttribute('fieldValue');
        if (attrValue) {
          try {
            this._fieldValue = JSON.parse(attrValue);
          } catch (error) {
            console.error('Error parsing fieldValue:', error);
            this._fieldValue = attrValue; // Use as string if JSON parsing fails
          }
        }
      }
      return this._fieldValue;
    }

    set fieldValue(value: unknown) {
      this._fieldValue = value;
    }

    // Getter for fieldName that reads from attribute
    get fieldName(): string {
      if (!this._fieldName) {
        this._fieldName = this.getAttribute('fieldName') || '';
      }
      return this._fieldName;
    }

    set fieldName(value: string) {
      this._fieldName = value;
    }

    // Getter for formParameters that reads from attribute
    get formParameters(): Record<string, unknown> {
      if (Object.keys(this._formParameters).length === 0) {
        const attrValue = this.getAttribute('formParameters');
        if (attrValue) {
          try {
            this._formParameters = JSON.parse(attrValue);
          } catch (error) {
            console.error('Error parsing formParameters:', error);
            this._formParameters = {};
          }
        }
      }
      return this._formParameters;
    }

    set formParameters(value: Record<string, unknown>) {
      this._formParameters = value;
    }

    // Getter for key that reads from attribute
    get key(): number {
      if (this._key === 0) {
        const attrValue = this.getAttribute('key');
        this._key = attrValue ? parseInt(attrValue, 10) : 0;
      }
      return this._key;
    }

    set key(value: number) {
      this._key = value;
    }

    // Getter for message that reads from attribute
    get message(): string {
      if (!this._message) {
        this._message = this.getAttribute('message') || '';
      }
      return this._message;
    }

    set message(value: string) {
      this._message = value;
    }

    // Getter for responsiveLayouts that reads from attribute
    get responsiveLayouts(): string {
      if (!this._responsiveLayouts) {
        this._responsiveLayouts = this.getAttribute('responsiveLayouts') || '';
      }
      return this._responsiveLayouts;
    }

    set responsiveLayouts(value: string) {
      this._responsiveLayouts = value;
    }

    // Getter for componentDefinition that reads from attribute
    get componentDefinition(): Record<string, unknown> {
      if (Object.keys(this._componentDefinition).length === 0) {
        const attrValue = this.getAttribute('componentDefinition');
        if (attrValue) {
          try {
            this._componentDefinition = JSON.parse(attrValue);
          } catch (error) {
            console.error('Error parsing componentDefinition:', error);
            this._componentDefinition = {};
          }
        }
      }
      return this._componentDefinition;
    }

    set componentDefinition(value: Record<string, unknown>) {
      this._componentDefinition = value;
    }

    // Handle attribute changes
    static get observedAttributes() {
      return ['document', 'template', 'fieldValue', 'fieldName', 'formParameters', 'key', 'message', 'responsiveLayouts', 'componentDefinition'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue !== newValue) {
        // Reset the corresponding cache
        switch (name) {
          case 'document':
            this._document = {} as FormDocument;
            break;
          case 'template':
            this._template = {} as FormTemplate;
            break;
          case 'fieldValue':
            this._fieldValue = null;
            break;
          case 'fieldName':
            this._fieldName = '';
            break;
          case 'formParameters':
            this._formParameters = {};
            break;
          case 'key':
            this._key = 0;
            break;
          case 'message':
            this._message = '';
            break;
          case 'responsiveLayouts':
            this._responsiveLayouts = '';
            break;
          case 'componentDefinition':
            this._componentDefinition = {};
            break;
        }

        // Re-render if already mounted
        if (this.root) {
          const props = {
            document: this.document,
            fieldValue: this.fieldValue,
            template: this.template,
            fieldName: this.fieldName,
            formParameters: this.formParameters,
            responsiveLayout: this.responsiveLayouts,
            message: this.message,
            componentDefinition: this.componentDefinition,
            componentProps: {}
          };
          
          this.root.render(
            <Component key={this.key} {...props} />
          );
        }
      }
    }

    connectedCallback() {
      let componentProps: Record<string, unknown> = {};

      this.mountPoint = document.createElement('div');
      this.appendChild(this.mountPoint);

      if (!this.fieldValue && this.componentDefinition?.defaultValue) {
        this.fieldValue = this.componentDefinition.defaultValue;
      }

      if (this.componentDefinition?.componentProps) {
        const handlebarsTemplate = Handlebars.compile(JSON.stringify(this.componentDefinition.componentProps));
        const templateResult = handlebarsTemplate({
          template: this.template,
          document: this.document
        });

        try {
          componentProps = JSON.parse(templateResult);
        } catch (error) {
          console.error('Error parsing componentProps:', error);
          componentProps = {};
        }
      }

      this.root = createRoot(this.mountPoint);
      const props = {
        document: this.document,
        fieldValue: this.fieldValue,
        template: this.template,
        fieldName: this.fieldName,
        formParameters: this.formParameters,
        responsiveLayout: this.responsiveLayouts,
        message: this.message,
        componentDefinition: this.componentDefinition,
        componentProps
      };
      
      this.root.render(
        <Component key={this.key} {...props} />
      );
    }

    disconnectedCallback() {
      if (this.root) {
        this.root.unmount();
      }
    }
  }

  customElements.define(name, FtWrapper);
};
