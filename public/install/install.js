
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('step-container');
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back');
  
  let currentStep = 0;
  const config = {
    installComplete: false,
    databaseConfig: {},
    adminUser: {},
    siteConfig: {}
  };

  // Define all installation steps
  const steps = [
    {
      id: 'welcome',
      title: 'Bem-vindo ao GuíaPG',
      content: `
        <div class="step-header">
          <h2>Bem-vindo ao Assistente de Instalação</h2>
          <p>Este assistente irá ajudá-lo a configurar seu site de anúncios GuíaPG em poucos passos.</p>
        </div>
        <div class="mb-6">
          <h3 class="font-semibold mb-2">Antes de começar, certifique-se de que você tem:</h3>
          <ul class="list-disc ml-6 space-y-2">
            <li>Banco de dados MySQL criado</li>
            <li>Usuário e senha do banco de dados</li>
            <li>Nome do host do banco de dados</li>
            <li>Permissões de escrita no servidor web</li>
          </ul>
        </div>
        <div class="mb-6">
          <h3 class="font-semibold mb-2">O assistente irá configurar:</h3>
          <ul class="list-disc ml-6 space-y-2">
            <li>Conexão com o banco de dados</li>
            <li>Tabelas necessárias para o funcionamento do site</li>
            <li>Conta de administrador</li>
            <li>Configurações iniciais do site</li>
          </ul>
        </div>
        <div class="bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
          <strong>Dica:</strong> Se você preferir utilizar Google Sheets como banco de dados em vez de MySQL, 
          você poderá configurar isso posteriormente no painel de administração, após a instalação inicial.
        </div>
      `
    },
    {
      id: 'requirements',
      title: 'Verificação de Requisitos',
      content: `
        <div class="step-header">
          <h2>Verificação de Requisitos do Sistema</h2>
          <p>Verificando se seu servidor atende aos requisitos mínimos.</p>
        </div>
        <div id="requirements-container">
          <div class="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-md">
            <span>PHP versão 7.4 ou superior</span>
            <span id="php-check" class="text-yellow-500">Verificando...</span>
          </div>
          <div class="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-md">
            <span>Extensão PDO MySQL</span>
            <span id="pdo-check" class="text-yellow-500">Verificando...</span>
          </div>
          <div class="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-md">
            <span>Permissões de escrita</span>
            <span id="write-check" class="text-yellow-500">Verificando...</span>
          </div>
          <div class="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-md">
            <span>mod_rewrite habilitado</span>
            <span id="rewrite-check" class="text-yellow-500">Verificando...</span>
          </div>
        </div>
        <div id="requirements-status" class="mt-6 p-4 rounded-md hidden"></div>
      `
    },
    {
      id: 'database',
      title: 'Configuração do Banco de Dados',
      content: `
        <div class="step-header">
          <h2>Configuração do Banco de Dados</h2>
          <p>Insira as informações de conexão com o seu banco de dados MySQL.</p>
        </div>
        <div id="db-form">
          <div class="form-group">
            <label for="db-host">Host do Banco de Dados</label>
            <input type="text" id="db-host" name="db-host" placeholder="localhost" value="localhost">
          </div>
          <div class="form-group">
            <label for="db-name">Nome do Banco de Dados</label>
            <input type="text" id="db-name" name="db-name" placeholder="guiapg">
          </div>
          <div class="form-group">
            <label for="db-user">Usuário do Banco de Dados</label>
            <input type="text" id="db-user" name="db-user" placeholder="root">
          </div>
          <div class="form-group">
            <label for="db-pass">Senha do Banco de Dados</label>
            <input type="password" id="db-pass" name="db-pass">
          </div>
          <div class="form-group">
            <label for="table-prefix">Prefixo das Tabelas</label>
            <input type="text" id="table-prefix" name="table-prefix" value="gp_" placeholder="gp_">
            <p class="text-sm text-gray-500 mt-1">Útil se você tiver múltiplas instalações no mesmo banco de dados.</p>
          </div>
        </div>
        <div id="db-test-result" class="mt-4 hidden"></div>
        <button id="test-connection" class="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Testar Conexão
        </button>
      `
    },
    {
      id: 'admin',
      title: 'Conta de Administrador',
      content: `
        <div class="step-header">
          <h2>Configuração da Conta de Administrador</h2>
          <p>Crie a conta principal de administrador do site.</p>
        </div>
        <div id="admin-form">
          <div class="form-group">
            <label for="admin-user">Nome de Usuário</label>
            <input type="text" id="admin-user" name="admin-user">
          </div>
          <div class="form-group">
            <label for="admin-email">E-mail</label>
            <input type="email" id="admin-email" name="admin-email">
          </div>
          <div class="form-group">
            <label for="admin-pass">Senha</label>
            <input type="password" id="admin-pass" name="admin-pass">
          </div>
          <div class="form-group">
            <label for="admin-pass-confirm">Confirme a Senha</label>
            <input type="password" id="admin-pass-confirm" name="admin-pass-confirm">
          </div>
        </div>
        <div id="password-strength" class="mt-2 text-sm"></div>
      `
    },
    {
      id: 'site',
      title: 'Configurações do Site',
      content: `
        <div class="step-header">
          <h2>Configurações Iniciais do Site</h2>
          <p>Defina as configurações básicas para seu site.</p>
        </div>
        <div id="site-form">
          <div class="form-group">
            <label for="site-name">Nome do Site</label>
            <input type="text" id="site-name" name="site-name" value="GuíaPG">
          </div>
          <div class="form-group">
            <label for="site-description">Descrição do Site</label>
            <input type="text" id="site-description" name="site-description" value="Guia de Anúncios e Serviços">
          </div>
          <div class="form-group">
            <label for="site-email">E-mail de Contato</label>
            <input type="email" id="site-email" name="site-email" placeholder="contato@seusite.com">
          </div>
          <div class="form-group">
            <label for="site-language">Idioma Principal</label>
            <select id="site-language" name="site-language">
              <option value="pt_BR" selected>Português do Brasil</option>
              <option value="en_US">English (US)</option>
              <option value="es_ES">Español</option>
            </select>
          </div>
        </div>
      `
    },
    {
      id: 'install',
      title: 'Instalação',
      content: `
        <div class="step-header">
          <h2>Instalando GuíaPG</h2>
          <p>Criando banco de dados e configurando o sistema...</p>
        </div>
        <div id="install-progress" class="space-y-4">
          <div class="flex justify-between items-center mb-2">
            <span>Testando conexão com o banco de dados</span>
            <span id="progress-db-connect" class="text-yellow-500">Aguardando...</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span>Criando tabelas</span>
            <span id="progress-tables" class="text-yellow-500">Aguardando...</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span>Configurando conta de administrador</span>
            <span id="progress-admin" class="text-yellow-500">Aguardando...</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span>Configurando informações do site</span>
            <span id="progress-site-info" class="text-yellow-500">Aguardando...</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span>Finalizando instalação</span>
            <span id="progress-finalize" class="text-yellow-500">Aguardando...</span>
          </div>
        </div>
        <div id="install-result" class="mt-6 hidden"></div>
      `
    },
    {
      id: 'complete',
      title: 'Instalação Concluída',
      content: `
        <div class="step-header">
          <h2>Instalação Concluída com Sucesso!</h2>
          <p>Seu site GuíaPG está pronto para uso.</p>
        </div>
        <div class="text-center my-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold mt-4">Parabéns!</h3>
          <p class="text-gray-600 mt-2">Seu site foi instalado com sucesso.</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-md mt-6">
          <h4 class="font-semibold mb-2">Próximos Passos:</h4>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Acesse o <a href="../admin" class="text-orange-500 font-semibold hover:underline">Painel de Administração</a> para começar a personalizar seu site.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Configure as categorias de anúncios e outras opções.</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Visite o <a href="../" class="text-orange-500 font-semibold hover:underline">site principal</a> para ver como está ficando.</span>
            </li>
          </ul>
        </div>
        <div class="bg-yellow-50 p-4 rounded-md mt-6 text-yellow-700">
          <p class="font-semibold">Importante:</p>
          <p>Por razões de segurança, recomendamos que você remova a pasta "install" do seu servidor.</p>
        </div>
      `
    }
  ];

  // Initialize the installation process
  function initializeInstallation() {
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    steps.forEach((step, index) => {
      const stepEl = document.createElement('div');
      stepEl.className = index === 0 ? 'progress-step active' : 'progress-step';
      stepEl.textContent = step.title;
      progressBar.appendChild(stepEl);
    });
    
    progressContainer.appendChild(progressBar);
    container.parentNode.insertBefore(progressContainer, container);

    // Render the first step
    renderStep(currentStep);
  }

  // Render a specific step
  function renderStep(stepIndex) {
    // Update progress bar
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
      if (index < stepIndex) {
        step.className = 'progress-step completed';
      } else if (index === stepIndex) {
        step.className = 'progress-step active';
      } else {
        step.className = 'progress-step';
      }
    });

    // Show/hide back button
    if (stepIndex > 0 && stepIndex < steps.length - 1) {
      btnBack.classList.remove('hidden');
    } else {
      btnBack.classList.add('hidden');
    }

    // Update next button text
    if (stepIndex === steps.length - 2) {
      btnNext.textContent = 'Instalar';
    } else if (stepIndex === steps.length - 1) {
      btnNext.textContent = 'Finalizar';
    } else {
      btnNext.textContent = 'Próximo';
    }

    // Enable/disable next button based on step validation
    updateNextButtonState();

    // Render the step content
    container.innerHTML = steps[stepIndex].content;

    // Initialize step-specific functionality
    initializeStepFunctionality(stepIndex);
  }

  // Initialize functionality specific to each step
  function initializeStepFunctionality(stepIndex) {
    switch(steps[stepIndex].id) {
      case 'requirements':
        checkServerRequirements();
        break;
      case 'database':
        initDatabaseStep();
        break;
      case 'admin':
        initAdminStep();
        break;
      case 'install':
        runInstallation();
        break;
    }
  }

  // Check server requirements
  function checkServerRequirements() {
    // Simulate checking server requirements
    setTimeout(() => {
      document.getElementById('php-check').innerHTML = '<span class="text-green-500">✓ PHP 8.1</span>';
      document.getElementById('pdo-check').innerHTML = '<span class="text-green-500">✓ Disponível</span>';
      document.getElementById('write-check').innerHTML = '<span class="text-green-500">✓ OK</span>';
      document.getElementById('rewrite-check').innerHTML = '<span class="text-green-500">✓ Habilitado</span>';
      
      const statusDiv = document.getElementById('requirements-status');
      statusDiv.classList.remove('hidden');
      statusDiv.classList.add('bg-green-50', 'text-green-700');
      statusDiv.innerHTML = '<p class="font-semibold">✓ Seu servidor atende a todos os requisitos!</p>';
      
      updateNextButtonState(true);
    }, 1500);
  }

  // Initialize database step functionality
  function initDatabaseStep() {
    const testBtn = document.getElementById('test-connection');
    testBtn.addEventListener('click', function() {
      const dbHost = document.getElementById('db-host').value;
      const dbName = document.getElementById('db-name').value;
      const dbUser = document.getElementById('db-user').value;
      const dbPass = document.getElementById('db-pass').value;
      
      if (!dbHost || !dbName || !dbUser) {
        showDbTestResult(false, 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Simulate testing database connection
      testBtn.textContent = 'Testando...';
      testBtn.disabled = true;
      
      setTimeout(() => {
        // Save database config
        config.databaseConfig = {
          host: dbHost,
          name: dbName,
          user: dbUser,
          password: dbPass,
          prefix: document.getElementById('table-prefix').value
        };
        
        showDbTestResult(true, 'Conexão estabelecida com sucesso!');
        testBtn.textContent = 'Testar Conexão';
        testBtn.disabled = false;
        updateNextButtonState(true);
      }, 1500);
    });
  }

  // Show database test result
  function showDbTestResult(success, message) {
    const resultDiv = document.getElementById('db-test-result');
    resultDiv.classList.remove('hidden');
    
    if (success) {
      resultDiv.className = 'mt-4 p-4 bg-green-50 text-green-700 rounded-md';
      resultDiv.innerHTML = `<p class="font-semibold">✓ ${message}</p>`;
    } else {
      resultDiv.className = 'mt-4 p-4 bg-red-50 text-red-700 rounded-md';
      resultDiv.innerHTML = `<p class="font-semibold">✗ ${message}</p>`;
    }
  }

  // Initialize admin step functionality
  function initAdminStep() {
    const passwordInput = document.getElementById('admin-pass');
    const confirmInput = document.getElementById('admin-pass-confirm');
    const strengthIndicator = document.getElementById('password-strength');
    
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      let strength = 0;
      
      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
      if (password.match(/[0-9]/)) strength += 1;
      if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
      
      let message = '';
      switch(strength) {
        case 0:
        case 1:
          message = '<span class="text-red-500">Senha fraca</span>';
          break;
        case 2:
          message = '<span class="text-yellow-500">Senha média</span>';
          break;
        case 3:
          message = '<span class="text-blue-500">Senha forte</span>';
          break;
        case 4:
          message = '<span class="text-green-500">Senha excelente</span>';
          break;
      }
      
      strengthIndicator.innerHTML = message;
    });
    
    confirmInput.addEventListener('input', validateAdminForm);
    document.getElementById('admin-user').addEventListener('input', validateAdminForm);
    document.getElementById('admin-email').addEventListener('input', validateAdminForm);
    passwordInput.addEventListener('input', validateAdminForm);
  }

  // Validate admin form
  function validateAdminForm() {
    const username = document.getElementById('admin-user').value;
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-pass').value;
    const confirm = document.getElementById('admin-pass-confirm').value;
    
    if (username && email && password && password === confirm && password.length >= 8) {
      config.adminUser = {
        username: username,
        email: email,
        password: password
      };
      updateNextButtonState(true);
    } else {
      updateNextButtonState(false);
    }
  }

  // Run the installation process
  function runInstallation() {
    // Save site config
    const siteNameEl = document.getElementById('site-name');
    const siteDescriptionEl = document.getElementById('site-description');
    const siteEmailEl = document.getElementById('site-email');
    const siteLanguageEl = document.getElementById('site-language');
    
    if (siteNameEl && siteDescriptionEl && siteEmailEl && siteLanguageEl) {
      config.siteConfig = {
        name: siteNameEl.value,
        description: siteDescriptionEl.value,
        email: siteEmailEl.value,
        language: siteLanguageEl.value
      };
    }
    
    // Simulate the installation process
    const steps = [
      { id: 'progress-db-connect', delay: 1000 },
      { id: 'progress-tables', delay: 2000 },
      { id: 'progress-admin', delay: 1500 },
      { id: 'progress-site-info', delay: 1000 },
      { id: 'progress-finalize', delay: 1500 }
    ];
    
    btnNext.disabled = true;
    btnBack.disabled = true;
    
    let currentIndex = 0;
    
    function processNextStep() {
      if (currentIndex >= steps.length) {
        // Installation complete
        const resultDiv = document.getElementById('install-result');
        resultDiv.classList.remove('hidden');
        resultDiv.className = 'mt-6 p-4 bg-green-50 text-green-700 rounded-md';
        resultDiv.innerHTML = `<p class="font-semibold">✓ Instalação concluída com sucesso!</p>`;
        
        btnNext.disabled = false;
        config.installComplete = true;
        
        // Generate config file (simulated)
        generateConfigFile();
        return;
      }
      
      const step = steps[currentIndex];
      const el = document.getElementById(step.id);
      
      if (el) {
        el.className = 'text-blue-500';
        el.textContent = 'Em progresso...';
        
        setTimeout(() => {
          el.className = 'text-green-500';
          el.textContent = '✓ Concluído';
          currentIndex++;
          processNextStep();
        }, step.delay);
      }
    }
    
    processNextStep();
  }

  // Generate config file (simulated)
  function generateConfigFile() {
    // In a real implementation, this would create a config file on the server
    console.log('Installation config:', config);
    
    // You would make an AJAX request here to a PHP script that generates the config file
    // For this demo, we just simulate it
  }

  // Update the state of the Next button based on step validation
  function updateNextButtonState(isValid) {
    if (isValid === undefined) {
      // Set default state based on step
      switch(steps[currentStep].id) {
        case 'welcome':
          btnNext.disabled = false;
          break;
        case 'requirements':
          btnNext.disabled = true;
          break;
        case 'database':
          btnNext.disabled = !config.databaseConfig.host;
          break;
        case 'admin':
          btnNext.disabled = !config.adminUser.username;
          break;
        case 'site':
          btnNext.disabled = false;
          break;
        case 'install':
          btnNext.disabled = !config.installComplete;
          break;
        case 'complete':
          btnNext.disabled = false;
          break;
      }
    } else {
      btnNext.disabled = !isValid;
    }
  }

  // Event listeners for navigation buttons
  btnNext.addEventListener('click', function() {
    // Save form data for site config step
    if (steps[currentStep].id === 'site') {
      config.siteConfig = {
        name: document.getElementById('site-name').value,
        description: document.getElementById('site-description').value,
        email: document.getElementById('site-email').value,
        language: document.getElementById('site-language').value
      };
    }
    
    // Go to next step
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep(currentStep);
      window.scrollTo(0, 0);
    } else {
      // Installation completed, redirect to admin
      window.location.href = '../admin';
    }
  });
  
  btnBack.addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      renderStep(currentStep);
      window.scrollTo(0, 0);
    }
  });

  // Start the installation process
  initializeInstallation();
});
