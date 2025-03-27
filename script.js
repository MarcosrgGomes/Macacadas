// Dados para as seções
const climateData = [
    { type: "Equatorial", description: "Quente e úmido o ano todo (Amazônia)", icon: "fa-temperature-high" },
    { type: "Tropical", description: "Verões quentes e chuvosos, invernos secos (Brasil central, Venezuela)", icon: "fa-sun" },
    { type: "Subtropical", description: "Chuvas bem distribuídas e temperaturas amenas (Sul do Brasil, Argentina)", icon: "fa-cloud-sun" },
    { type: "Desértico", description: "Árido com pouca chuva (Deserto do Atacama no Chile)", icon: "fa-sun" },
    { type: "Mediterrâneo", description: "Verões quentes e secos, invernos chuvosos (centro do Chile)", icon: "fa-umbrella-beach" },
    { type: "Temperado", description: "Clima mais frio com estações bem definidas (Argentina, Uruguai)", icon: "fa-snowflake" },
    { type: "Frio de montanha", description: "Temperaturas baixas o ano todo (Cordilheira dos Andes)", icon: "fa-mountain" }
];

const vegetationData = [
    { name: "Floresta Amazônica", description: "Maior floresta tropical do mundo", icon: "fa-tree" },
    { name: "Mata Atlântica", description: "Vegetação densa e rica em biodiversidade", icon: "fa-leaf" },
    { name: "Cerrado", description: "Savana tropical brasileira", icon: "fa-pagelines" },
    { name: "Pampa", description: "Campos naturais na Argentina e Uruguai", icon: "fa-grass" },
    { name: "Caatinga", description: "Vegetação adaptada ao clima semiárido", icon: "fa-cactus" },
    { name: "Pantanal", description: "Maior planície alagável do mundo", icon: "fa-water" }
];

const resourcesData = [
    { resource: "Petróleo", countries: "Venezuela, Brasil, Argentina", icon: "fa-gas-pump" },
    { resource: "Gás Natural", countries: "Bolívia, Argentina, Brasil", icon: "fa-fire" },
    { resource: "Minérios", countries: "Ferro (BR), Cobre (CL), Lítio (BO)", icon: "fa-gem" },
    { resource: "Água Doce", countries: "Bacias Amazônica e do Prata", icon: "fa-tint" },
    { resource: "Biodiversidade", countries: "Florestas e ecossistemas diversos", icon: "fa-dna" }
];

// Função para carregar os dados climáticos
function loadClimateData() {
    const climateGrid = document.getElementById('climate-grid');
    
    climateData.forEach(climate => {
        const card = document.createElement('div');
        card.className = 'climate-card';
        card.innerHTML = `
            <h3><i class="fas ${climate.icon}"></i> ${climate.type}</h3>
            <p>${climate.description}</p>
        `;
        climateGrid.appendChild(card);
    });
}

// Função para carregar os dados de vegetação
function loadVegetationData() {
    const vegetationContainer = document.getElementById('vegetation-container');
    
    vegetationData.forEach(vegetation => {
        const item = document.createElement('div');
        item.className = 'vegetation-item';
        item.innerHTML = `
            <div class="vegetation-icon">
                <i class="fas ${vegetation.icon}"></i>
            </div>
            <div>
                <h3>${vegetation.name}</h3>
                <p>${vegetation.description}</p>
            </div>
        `;
        vegetationContainer.appendChild(item);
    });
}

// Função para carregar os dados de recursos
function loadResourcesData() {
    const resourcesChart = document.getElementById('resources-chart');
    
    resourcesData.forEach(resource => {
        const item = document.createElement('div');
        item.className = 'resource-item';
        item.innerHTML = `
            <div class="resource-icon">
                <i class="fas ${resource.icon}"></i>
            </div>
            <div>
                <h3>${resource.resource}</h3>
                <p><strong>Principais países:</strong> ${resource.countries}</p>
            </div>
        `;
        resourcesChart.appendChild(item);
    });
}

// Função para animar as estatísticas
function animateStats() {
    const statCircles = document.querySelectorAll('.stat-circle');
    
    statCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const span = circle.querySelector('span');
        let counter = 0;
        
        const animation = setInterval(() => {
            if (counter >= percent) {
                clearInterval(animation);
            } else {
                counter++;
                span.textContent = counter + '%';
                circle.style.background = `conic-gradient(var(--primary-color) ${counter}%, var(--light-color) ${counter}%)`;
            }
        }, 20);
    });
}

// Função para o sistema de tabs
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Função para o botão de explorar
function setupExploreButton() {
    const exploreBtn = document.getElementById('explore-btn');
    
    exploreBtn.addEventListener('click', () => {
        document.querySelector('#clima').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Função para o formulário de newsletter
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        
        // Simulação de envio
        form.innerHTML = `
            <p style="color: white; font-size: 1.2rem;">
                <i class="fas fa-check-circle"></i> Obrigado por se inscrever!
            </p>
        `;
        
        // Limpar após 5 segundos
        setTimeout(() => {
            form.innerHTML = `
                <input type="email" placeholder="Seu melhor e-mail" required>
                <button type="submit" class="btn">Assinar <i class="fas fa-paper-plane"></i></button>
            `;
            setupNewsletterForm(); // Re-setup the form
        }, 5000);
    });
}

// Observador de interseção para animações
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'economia') {
                    animateStats();
                }
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Observar seções que devem ser animadas
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Navbar sticky e scroll suave
function setupScrollBehavior() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
    
    // Scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    loadClimateData();
    loadVegetationData();
    loadResourcesData();
    setupTabs();
    setupExploreButton();
    setupNewsletterForm();
    setupIntersectionObserver();
    setupScrollBehavior();
});