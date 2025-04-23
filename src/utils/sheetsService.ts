
/**
 * Google Sheets Integration Utility
 * Handles all interactions with Google Sheets API
 */

/**
 * Configuration interface for Google Sheets
 */
interface SheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  webAppUrl?: string; // URL for the Google Apps Script web app
}

// Cached configuration
let sheetsConfig: SheetsConfig = {
  apiKey: '',
  spreadsheetId: '',
};

// Sheet names used in the application
export enum SheetNames {
  USERS = 'usuarios',
  LISTINGS = 'anuncios',
  IMAGES = 'imagens',
  SETTINGS = 'configuracoes',
}

/**
 * Set the Google Sheets configuration
 */
export const setGoogleSheetsConfig = (config: SheetsConfig): void => {
  sheetsConfig = { ...config };
  localStorage.setItem('sheetsConfig', JSON.stringify(config));
};

/**
 * Get the Google Sheets configuration
 */
export const getGoogleSheetsConfig = (): SheetsConfig => {
  const storedConfig = localStorage.getItem('sheetsConfig');
  if (storedConfig) {
    sheetsConfig = JSON.parse(storedConfig);
  }
  return sheetsConfig;
};

/**
 * Test the connection to Google Sheets
 */
export const testSheetsConnection = async (): Promise<{success: boolean, message: string}> => {
  const config = getGoogleSheetsConfig();
  
  if (!config.apiKey || !config.spreadsheetId) {
    return {
      success: false,
      message: 'Configuração incompleta. Por favor, forneça um ID de planilha e uma chave de API.'
    };
  }

  try {
    // Test by fetching the spreadsheet metadata
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}?key=${config.apiKey}`
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: `Erro ao conectar: ${error.error.message || 'Erro desconhecido'}`
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: `Conexão bem-sucedida! Planilha "${data.properties.title}" encontrada com ${data.sheets.length} abas.`
    };
  } catch (error) {
    console.error('Erro ao testar conexão com Google Sheets:', error);
    return {
      success: false,
      message: `Erro ao conectar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
};

/**
 * Fetch data from a specific sheet
 */
export const fetchSheetData = async <T>(sheetName: SheetNames): Promise<T[]> => {
  const config = getGoogleSheetsConfig();
  
  if (!config.apiKey || !config.spreadsheetId) {
    throw new Error('Configuração de Google Sheets não encontrada');
  }

  try {
    // If using Google Apps Script Web App
    if (config.webAppUrl) {
      const response = await fetch(
        `${config.webAppUrl}?action=read&sheet=${sheetName}`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da planilha');
      }
      
      return await response.json();
    } 
    
    // If using direct Google Sheets API
    else {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${sheetName}?key=${config.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da planilha');
      }
      
      const data = await response.json();
      
      // Convert from array format to object format
      const headers = data.values[0];
      const rows = data.values.slice(1);
      
      return rows.map(row => {
        const item = {} as any;
        headers.forEach((header: string, index: number) => {
          item[header] = row[index];
        });
        return item as T;
      });
    }
  } catch (error) {
    console.error(`Erro ao buscar dados da planilha ${sheetName}:`, error);
    throw error;
  }
};

/**
 * Create a new record in a sheet
 */
export const createSheetRecord = async <T>(sheetName: SheetNames, record: T): Promise<T> => {
  const config = getGoogleSheetsConfig();
  
  if (!config.webAppUrl) {
    throw new Error('URL do Web App não configurada');
  }

  try {
    const response = await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        sheet: sheetName,
        data: record
      })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao criar registro na planilha');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao criar registro na planilha ${sheetName}:`, error);
    throw error;
  }
};

/**
 * Update an existing record in a sheet
 */
export const updateSheetRecord = async <T>(
  sheetName: SheetNames, 
  id: string | number, 
  record: Partial<T>
): Promise<T> => {
  const config = getGoogleSheetsConfig();
  
  if (!config.webAppUrl) {
    throw new Error('URL do Web App não configurada');
  }

  try {
    const response = await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'update',
        sheet: sheetName,
        id,
        data: record
      })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao atualizar registro na planilha');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar registro na planilha ${sheetName}:`, error);
    throw error;
  }
};

/**
 * Delete a record from a sheet
 */
export const deleteSheetRecord = async (
  sheetName: SheetNames, 
  id: string | number
): Promise<{success: boolean}> => {
  const config = getGoogleSheetsConfig();
  
  if (!config.webAppUrl) {
    throw new Error('URL do Web App não configurada');
  }

  try {
    const response = await fetch(config.webAppUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        sheet: sheetName,
        id
      })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao excluir registro da planilha');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao excluir registro da planilha ${sheetName}:`, error);
    throw error;
  }
};
