# 🍺 Tavern & Tales — Game Design Document

> **Gênero:** Idle Game / Incremental RPG  
> **Plataforma:** Mobile / Web  
> **Tema:** Fantasia Medieval  

---

## 📜 Premissa

Você é um taverneiro aposentado de aventuras que decide abrir sua própria taverna em uma cidade de fantasia medieval. Seu objetivo: transformar um casebre decadente na taverna mais lendária do reino, atraindo heróis, comerciantes e até a realeza.

---

## 🎮 Loop Principal de Gameplay

### 1. Produção de Recursos (Idle Core)

Recursos básicos que se acumulam passivamente:

| Recurso | Fonte | Uso |
|---------|-------|-----|
| **Moedas de Cobre** | Vendas na taverna | Upgrades básicos |
| **Grãos** | Fazendas contratadas | Cerveja, pão |
| **Madeira** | Lenhadores | Expansões, móveis |
| **Lúpulo & Ervas** | Horta própria | Receitas especiais |
| **Reputação** | Clientes satisfeitos | Desbloquear áreas e clientes VIP |

#### Moedas e Economia

- **Cobre** → Moeda básica (comum)
- **Prata** → Moeda intermediária (1 prata = 100 cobre)
- **Ouro** → Moeda premium (1 ouro = 100 prata)
- **Gemas Arcanas** → Moeda de prestígio (obtida em resets)

---

### 2. Sistema de Brewing (Craftação)

Crie receitas de bebidas combinando ingredientes. Cada receita tem um **tempo de fermentação** que roda em tempo real (idle).

#### Receitas Básicas

| Bebida | Ingredientes | Tempo | Valor de Venda |
|--------|--------------|-------|----------------|
| Cerveja Comum | 2 Grãos + 1 Água | 5 min | 5 Cobre |
| Vinho da Casa | 3 Uvas + 1 Erva | 15 min | 15 Cobre |
| Hidromel Dourado | 2 Mel + 2 Ervas | 1 hora | 1 Prata |

#### Receitas Avançadas (Desbloqueáveis)

| Bebida | Ingredientes | Tempo | Valor de Venda |
|--------|--------------|-------|----------------|
| Elixir do Guerreiro | 2 Lúpulo Raro + 1 Sangue de Wyvern | 4 horas | 10 Prata |
| Néctar dos Deuses | 1 Lágrima de Fênix + 3 Mel Élfico + 1 Essência Arcana | 24 horas | 1 Ouro |
| Grog do Caos | 5 Ingredientes Aleatórios | 30 min | ??? (resultado variável) |

#### Mecânica de Descoberta

- Combinações não catalogadas geram **"Experimentos"**
- Experimentos bem-sucedidos desbloqueiam novas receitas permanentemente
- Experimentos fracassados geram **"Gororoba"** (venda baixa, mas alguns NPCs gostam)

---

### 3. Sistema de Clientes

#### Tipos de Clientes

| Tipo | Horário | Preferência | Recompensa Especial |
|------|---------|-------------|---------------------|
| **Fazendeiros** | Manhã | Cerveja barata | Grãos extras |
| **Guardas** | Tarde | Vinho | Proteção contra eventos negativos |
| **Aventureiros** | Noite | Bebidas fortes | Loot de missões |
| **Nobres** | Noite (raro) | Bebidas premium | Moedas de Ouro |
| **Criaturas Mágicas** | Meia-noite | Receitas exóticas | Ingredientes raros |

#### Satisfação do Cliente

Cada cliente tem uma barra de satisfação baseada em:

- Bebida certa disponível (+50%)
- Tempo de espera baixo (+30%)
- Ambiente da taverna (+20%)

**Alta satisfação** = Gorjetas + Chance de cliente recorrente

---

### 4. Aventureiros e Missões

Aventureiros frequentam sua taverna e podem ser **patrocinados** para ir em missões.

#### Como Funciona

1. Aventureiro aparece na taverna
2. Você oferece **suprimentos** (comida, poções, equipamentos)
3. Ele parte em missão (timer offline de 1h a 24h)
4. Retorna com **loot** proporcional ao investimento e risco

#### Tabela de Missões

| Missão | Duração | Investimento | Recompensa Possível | Risco de Falha |
|--------|---------|--------------|---------------------|----------------|
| Caça a Goblins | 1h | 10 Cobre | Ervas, Cobre | 5% |
| Explorar Ruínas | 4h | 1 Prata | Gemas, Receitas | 15% |
| Caçar Dragão | 12h | 10 Prata | Sangue de Dragão, Ouro | 40% |
| Expedição ao Abismo | 24h | 1 Ouro | Ingredientes Lendários | 60% |

#### Ranking de Aventureiros

Aventureiros ganham **XP** a cada missão bem-sucedida:

- **Novato** (Nível 1-5) → Missões fáceis
- **Veterano** (Nível 6-15) → Missões médias
- **Herói** (Nível 16-30) → Missões difíceis
- **Lenda** (Nível 31+) → Missões épicas exclusivas

---

### 5. Expansão da Taverna

#### Estruturas e Upgrades

| Estrutura | Custo Base | Efeito | Níveis Máx |
|-----------|------------|--------|------------|
| **Balcão** | 100 Cobre | +2 clientes simultâneos por nível | 10 |
| **Mesas** | 50 Cobre | +1 capacidade por mesa | 20 |
| **Quartos** | 5 Prata | Renda passiva noturna | 8 |
| **Cozinha** | 10 Prata | Desbloqueia venda de comida | 5 |
| **Adega** | 20 Prata | +3 slots de fermentação por nível | 10 |
| **Palco** | 50 Prata | Multiplicador de reputação x1.5 | 3 |
| **Estábulo** | 1 Ouro | Atrai viajantes de longe | 5 |
| **Torre Arcana** | 10 Ouro | Atrai criaturas mágicas | 3 |

#### Decoração (Bônus Passivos)

- **Troféus de Monstros** → +Reputação com Aventureiros
- **Tapeçarias Nobres** → +Reputação com Nobres
- **Fogueira Aconchegante** → +Satisfação geral
- **Estátua do Fundador** → +Gorjetas

---

### 6. Ciclo Dia/Noite e Eventos

#### Ciclo Temporal

Um dia completo no jogo = **10 minutos reais** (configurável)

| Período | Duração | Características |
|---------|---------|-----------------|
| **Manhã** | 2 min | Clientes calmos, bom para produção |
| **Tarde** | 3 min | Pico de movimento, mais vendas |
| **Noite** | 3 min | Aventureiros, eventos especiais |
| **Madrugada** | 2 min | Criaturas raras, perigo de eventos negativos |

#### Eventos Aleatórios

**Eventos Positivos:**

- 🎉 **Festival Local** → Dobro de clientes por 1 hora
- 👑 **Visita Real** → Bônus massivo de ouro e reputação
- 🎵 **Bardo Famoso** → Atrai nobres por 30 minutos
- 🍀 **Colheita Abençoada** → Produção de grãos x3

**Eventos Negativos:**

- 👊 **Briga de Bar** → Perde móveis, precisa reparar
- 🐀 **Infestação** → Perde estoque de grãos
- 🌧️ **Tempestade** → Menos clientes por 2 horas
- 💀 **Praga** → Produção reduzida, clientes evitam a taverna

**Eventos Neutros:**

- 🎲 **Apostador Misterioso** → Mini-game de risco/recompensa
- 📜 **Coletor de Impostos** → Pague ou perca reputação
- 🔮 **Profecia** → Dica sobre próximo evento

---

## 🌟 Progressão e Prestígio

### Marcos de Progressão

| Tier | Nome | Requisito | Benefício Desbloqueado |
|------|------|-----------|------------------------|
| 1 | Taverna de Vilarejo | Início | Sistema básico |
| 2 | Estalagem Regional | 1.000 Reputação | Quartos, viajantes |
| 3 | Guilda de Aventureiros | 10.000 Reputação | Sistema de missões completo |
| 4 | Palácio do Hidromel | 100.000 Reputação | Clientes lendários, receitas míticas |
| 5 | Taverna Interdimensional | 1.000.000 Reputação | Criaturas de outros planos |

### Sistema de Prestígio: "Lendas da Taverna"

Ao atingir o Tier 5, você pode **"Aposentar"** e começar uma nova taverna em outra região do reino.

#### O que você mantém:

- ✅ Receitas descobertas
- ✅ Bônus permanentes de conquistas
- ✅ Heróis lendários (visitam todas as tavernas)
- ✅ Gemas Arcanas acumuladas

#### O que você perde:

- ❌ Estruturas e upgrades
- ❌ Moedas comuns (Cobre, Prata, Ouro)
- ❌ Estoque de ingredientes
- ❌ Clientes regulares

#### Bônus de Prestígio

Cada reset concede **Gemas Arcanas** baseadas na reputação final:

| Gemas | Upgrade Permanente |
|-------|-------------------|
| 10 | +10% velocidade de produção |
| 25 | +1 slot de fermentação inicial |
| 50 | Começa com Balcão nível 2 |
| 100 | Desbloqueia região especial |
| 250 | Aventureiro Lendário garantido |

---

## ⚔️ Elementos de RPG

### Árvore de Talentos do Taverneiro

Ganhe **Pontos de Talento** a cada 1.000 de Reputação.

#### Ramo: Carisma

- **Sorriso Cativante** → +10% gorjetas
- **Conversa Fiada** → Clientes ficam mais tempo
- **Fama Local** → +20% chance de clientes VIP

#### Ramo: Alquimia

- **Mestre Cervejeiro** → -15% tempo de fermentação
- **Paladar Refinado** → +Qualidade das receitas
- **Experimentador** → +Chance de descobrir receitas

#### Ramo: Negociação

- **Pechincha** → -10% custo de ingredientes
- **Fornecedores Leais** → Entregas mais rápidas
- **Monopólio** → Preços de venda +25%

#### Ramo: Liderança

- **Motivador** → Funcionários +20% eficiência
- **Recrutador** → Mais aventureiros aparecem
- **Estrategista** → Missões -20% tempo

### Sistema de Facções

| Facção | Como Aumentar Rep | Benefício |
|--------|-------------------|-----------|
| **Guilda dos Mercadores** | Vender muito | Descontos em compras |
| **Ordem dos Cavaleiros** | Patrocinar missões nobres | Proteção contra eventos negativos |
| **Círculo dos Magos** | Servir bebidas arcanas | Ingredientes mágicos raros |
| **Submundo** | Aceitar clientes suspeitos | Itens contrabandeados baratos |

### Quests Narrativas

Aventureiros trazem **histórias** que geram mini-quests:

> *"Ouvi falar de uma adega abandonada nas montanhas. Dizem que lá há receitas perdidas dos anões..."*

**Escolha:**

- A) Financiar expedição (custo alto, recompensa certa)
- B) Esperar outro aventureiro (sem custo, recompensa incerta)
- C) Ir pessoalmente (mini-game, risco pessoal)

---

## 💰 Monetização (Modelo Ético)

### Gratuito e Justo

O jogo é **completamente jogável sem gastar dinheiro**. Monetização opcional:

| Item | Preço Sugerido | Efeito |
|------|----------------|--------|
| Skin de Taverna | $2-5 | Apenas visual |
| Passe de Temporada | $5/mês | Eventos exclusivos, skins |
| Pacote de Gemas | $1-20 | Acelera prestígio (não P2W) |
| Remoção de Anúncios | $3 (único) | Remove ads opcionais |

### O que NÃO terá:

- ❌ Paywall em conteúdo essencial
- ❌ Energia/Vidas limitadas
- ❌ Vantagens competitivas pagas
- ❌ Loot boxes com itens gameplay

---

## 🎨 Direção Artística

### Estilo Visual

- **Pixel Art** detalhada (estilo Stardew Valley / Graveyard Keeper)
- Paleta de cores quentes (madeira, fogo, cerveja dourada)
- Animações suaves para clientes e produção

### Som e Música

- Trilha sonora medieval ambiente
- Sons de taverna (conversas, copos, lareira)
- Efeitos satisfatórios para vendas e descobertas

---

## 📱 UI/UX Mobile-First

### Tela Principal

```
┌─────────────────────────────────┐
│  [Moedas] [Reputação] [Gemas]   │
├─────────────────────────────────┤
│                                 │
│     [VISUALIZAÇÃO DA TAVERNA]   │
│        (clientes animados)      │
│                                 │
├─────────────────────────────────┤
│ [Brewing] [Missões] [Upgrades]  │
│ [Clientes] [Eventos] [Config]   │
└─────────────────────────────────┘
```

### Princípios de UX

- Máximo 2 toques para qualquer ação
- Notificações opcionais para eventos importantes
- Modo offline robusto (sincroniza ao voltar)
- Tutorial não-intrusivo

---

## 📋 Roadmap de Desenvolvimento

### MVP (Mês 1-2)

- [ ] Sistema básico de recursos
- [ ] 5 receitas iniciais
- [ ] 3 tipos de clientes
- [ ] Upgrades básicos de taverna

### Alpha (Mês 3-4)

- [ ] Sistema de missões
- [ ] Ciclo dia/noite
- [ ] 10+ receitas
- [ ] Eventos aleatórios

### Beta (Mês 5-6)

- [ ] Sistema de prestígio
- [ ] Facções
- [ ] 25+ receitas
- [ ] Balanceamento

### Lançamento (Mês 7+)

- [ ] Polimento visual
- [ ] Monetização
- [ ] Localização
- [ ] Marketing

---

## 📝 Notas Finais

### Inspirações

- **Idle Miner Tycoon** → Loop de progressão
- **Stardew Valley** → Atmosfera e crafting
- **Soda Dungeon** → Sistema de aventureiros
- **Graveyard Keeper** → Estética medieval dark

### Diferenciais

1. **Profundidade de Crafting** → Descoberta de receitas é central
2. **NPCs com Personalidade** → Clientes recorrentes criam conexão
3. **Narrativa Emergente** → Histórias surgem organicamente
4. **Respeito ao Jogador** → Sem práticas predatórias

---

*Documento criado em Janeiro/2026*  
*Versão 1.0*
