import { useState } from "react";

// ─── DADOS ───────────────────────────────────────────────────────────────────

const aulas = [
  {
    id: 1,
    titulo: "Introdução à MN",
    subtitulo: "Radiação · Radiofármacos · Instrumentação · Tipos de Exame",
    cor: "#6366f1",
    icone: "☢️",
    tags: ["Tc-99m = 6h, 140keV, gerador", "F-18 = PET, 110min, 511keV", "Penetração ∝ 1/Ionização", "Gama = diagnóstico | Alfa/Beta- = terapia"],
    secoes: [
      {
        id: "rad", icon: "⚡", label: "Tipos de Radiação", color: "#ef4444",
        summary: "Eletromagnéticas (gama, RX) vs Particuladas (alfa, beta). Penetração × Ionização = inversamente proporcionais.",
        blocks: [
          { title: "Eletromagnéticas — Diagnóstico", color: "#ef4444", items: ["Raio Gama → origem: NÚCLEO", "Raio X → origem: ELETROSFERA", "SEM massa — adotam forma de onda", "Alta penetração / Baixa ionização → DIAGNÓSTICO"] },
          { title: "Particuladas — Terapia", color: "#dc2626", items: ["Alfa (α) → +2 carga → TERAPIA (ideal!)", "Beta- (β-) → -1 → TERAPIA", "Beta+ (β+) → +1 → PET (diagnóstico via aniquilação)", "COM massa → interagem fortemente com matéria"] },
          { title: "Penetração × Ionização", color: "#b91c1c", items: ["INVERSAMENTE PROPORCIONAIS", "PENETRAÇÃO: Gama > RaioX > Beta > Alfa", "IONIZAÇÃO: Alfa > Beta > RaioX > Gama", "Diagnóstico → alta penetração (gama sai do corpo)", "Terapia → alta ionização (destrói célula por dentro)"] },
        ],
      },
      {
        id: "rf", icon: "💉", label: "Radiofármaco", color: "#10b981",
        summary: "Radionuclídeo + Fármaco = Biomarcador. Tropismo leva ao alvo. Iodo = exceção (puro).",
        blocks: [
          { title: "Conceito e propriedades ideais", color: "#10b981", items: ["Radionuclídeo + molécula/anticorpo/elemento sanguíneo", "Fármaco dá TROPISMO → guia ao órgão-alvo", "Iodo radioativo = exceção: radionuclídeo E RF puro", "❌ Não tóxico | ❌ Não metabolizável | ❌ Sem efeito farmacológico", "☢️ Emitir APENAS gama | ⏱️ Meia-vida baixa | 🛠️ Preparo simples"] },
          { title: "Mecanismos de localização", color: "#059669", items: ["Transporte ativo → I-131, Tl-201", "Fagocitose → estanho coloidal (fígado)", "Bloqueio de capilares → Tc-MAA (pulmão)", "Sequestro celular → hemácias marcadas", "Localização compartimental → Tc-DTPA", "Absorção físico-química → Tc-MDP (osso)", "Antígeno-anticorpo → leucócitos marcados"] },
        ],
      },
      {
        id: "nucl", icon: "⚛️", label: "Radionuclídeos", color: "#8b5cf6",
        summary: "Tc-99m = mais usado (6h, 140keV, gerador). F-18 = PET (110min, 511keV, cíclotron).",
        blocks: [
          { title: "⭐ Tc-99m — O mais usado", color: "#8b5cf6", items: ["Meia-vida: 6 horas", "Energia: 140 keV (ideal para gama-câmara)", "Decaimento: transição isomérica", "Produção: GERADOR Mo-99 → Tc-99m", "Não precisa de reator no hospital"] },
          { title: "Outros radionuclídeos", color: "#7c3aed", items: ["F-18 → PET → 110 min → Cíclotron → 511 keV", "I-131 → Terapia/diagnóstico → 8 dias → Reator", "I-123 → Tireoide → 13,2h → Acelerador", "Tl-201 → Coração → 73,1h → Acelerador", "Ga-67 → Inflamação → 78,3h → Acelerador"] },
          { title: "Métodos de produção", color: "#6d28d9", items: ["REATOR → négatrons → I-131, Mo-99", "CÍCLOTRON → pósitrons → F-18, Ga-67, Tl-201", "GERADOR → Mo-99 decai → Tc-99m liberado", "Gerador: 'ordenhado' com salina a cada 24h"] },
        ],
      },
      {
        id: "inst", icon: "🔬", label: "Instrumentação & Exames", color: "#0ea5e9",
        summary: "Gama-câmara (SPECT) e PET. Exames estáticos, dinâmicos e tomográficos. SPECT/CT e PET/CT = fusão funcional+anatômica.",
        blocks: [
          { title: "Aparelhos", color: "#0ea5e9", items: ["Geiger-Müller → detecta radiação de superfície", "Calibrador de dose → mede atividade antes de injetar", "Gama-probe → cirurgia radioguiada (linfonodo sentinela)", "Gama-câmara → radiação gama → imagem (SPECT)", "PET → aniquilação β+ → 2 fótons 511keV em 180°"] },
          { title: "Tipos de exame", color: "#0284c7", items: ["ESTÁTICO: somatório da energia em cada pixel — 2D", "DINÂMICO: imagens em intervalos de tempo — avalia trânsito", "TOMOGRÁFICO (SPECT): 180°/360° → axial, sagital, coronal", "PET: anel de detectores → coincidência dos 2 fótons", "SPECT/CT e PET/CT: funcional + anatômico"] },
        ],
      },
    ],
  },

  {
    id: 2,
    titulo: "Cintilografia Pulmonar",
    subtitulo: "Ventilação · Perfusão · TEP · Mismatch vs Match",
    cor: "#0ea5e9",
    icone: "🫁",
    tags: ["Ventilação → DTPA inalatório", "Perfusão → MAA intravenoso", "Mismatch = TEP", "Match = Parênquima", "Gestante → cintilografia (não angioTC)"],
    secoes: [
      {
        id: "vent", icon: "🌬️", label: "Ventilação (1ª etapa)", color: "#0ea5e9",
        summary: "Tc-DTPA aerossol (mais usado). Via inalatória. Artefatos em boca, traqueia, estômago = NORMAL.",
        blocks: [
          { title: "Radiofármacos (+ ao – usado)", color: "#0ea5e9", items: ["⭐ Tc-DTPA aerossol → MAIS USADO — acessível", "Gases nobres (Xe-133, Kr-81m) → melhor imagem, pouco disponível", "Technegas (carbono+Tc) → melhor contagem, mais caro", "Via: INALATÓRIA (nebulização em sistema fechado)"] },
          { title: "Padrão normal e DPOC", color: "#0284c7", items: ["✅ Artefatos em boca, traqueia, estômago = NORMAL", "✅ Distribuição homogênea nos campos pulmonares", "⚠️ Impressão cardíaca na base E anterior = NORMAL", "DPOC: material em boca/esôfago/estômago, acúmulo brônquios centrais, difícil interpretar"] },
        ],
      },
      {
        id: "perf", icon: "🩸", label: "Perfusão (2ª etapa)", color: "#f43f5e",
        summary: "Tc-MAA intravenoso. Microembolização temporária dos capilares. ⚠️ Shunt D→E = contraindicado.",
        blocks: [
          { title: "Tc-MAA — Como funciona", color: "#f43f5e", items: ["MAA = Macroagregado de Albumina", "Via: INTRAVENOSA, lenta, paciente em SUPINO", "~300.000 partículas (mínimo 100.000)", "Microembolização temporária dos capilares → alta retenção 1ª passagem", "Partículas degradadas depois (sem dano)"] },
          { title: "Doses especiais ⚠️", color: "#be123c", items: ["👶 Crianças → dose mínima", "🫀 HAS pulmonar → dose mínima", "❌ Shunt D→E → CONTRAINDICADO", "Paciente inspirar fundo antes da injeção → distribuição homogênea"] },
        ],
      },
      {
        id: "interp", icon: "🔍", label: "Interpretação — Mismatch vs Match", color: "#f59e0b",
        summary: "Mismatch (vent normal + perf alterada) = TEP. Match (ambos alterados) = Parênquima.",
        blocks: [
          { title: "🚨 MISMATCH = TEP", color: "#f59e0b", items: ["Ventilação: NORMAL ✅", "Perfusão: ALTERADA ❌ (cunha triangular)", "O ar chega, o sangue NÃO → êmbolo!", "Padrão clássico de TEP", "Alta mortalidade se não diagnosticado (30%)"] },
          { title: "🟡 MATCH = Parênquima", color: "#d97706", items: ["Ventilação: ALTERADA ❌", "Perfusão: ALTERADA ❌ (mesma área)", "Problema no PARÊNQUIMA", "Ex: pneumonia, atelectasia, tumor, edema", "Formas variadas — não triangular"] },
          { title: "Indicações especiais", color: "#b45309", items: ["✅ Gestante → cintilografia (não angioTC)", "✅ Alergia a contraste iodado → cintilografia", "✅ IRC → cintilografia (contraste piora função)", "❌ Shunt D→E → só ventilação, perfusão contraindicada"] },
        ],
      },
    ],
  },

  {
    id: 3,
    titulo: "Cintilografia Óssea",
    subtitulo: "MDP · 3 Fases · Metástases · Superscan · Osteomielite · Paget",
    cor: "#f97316",
    icone: "🦴",
    tags: ["Tc-MDP → hidroxiapatita", "Lesão osteolítica → falso-negativo!", "Superscan = sem bexiga/rins", "Osteomielite = 3 fases+", "Celulite = tardia negativa", "Paget = contínuo | Metástase = salpicado"],
    secoes: [
      {
        id: "rf_osso", icon: "💉", label: "Radiofármaco & Mecanismo", color: "#f97316",
        summary: "Tc-MDP liga-se à hidroxiapatita. Proporcional à atividade osteoblástica. Lesão osteolítica = falso-negativo.",
        blocks: [
          { title: "Tc-99m-MDP", color: "#f97316", items: ["Liga-se à HIDROXIAPATITA", "Captação ∝ atividade OSTEOBLÁSTICA", "NÃO captado por células ósseas (sem captação celular)", "Eliminação renal → orientar hidratação", "Imagens ~3h após IV | Dose: ~25 mCi"] },
          { title: "Osteoblástica vs Osteolítica", color: "#ea580c", items: ["Osteoblástica → remodelamento → HIPERCAPTAÇÃO", "Osteolítica → destruição pura → FALSO-NEGATIVO", "⚠️ Mieloma múltiplo = osteolítico = pode ser FN!", "Para lesões osteolíticas: PET-CT é superior"] },
        ],
      },
      {
        id: "fases", icon: "📊", label: "3 Fases do Exame", color: "#8b5cf6",
        summary: "Fluxo (1ºmin) → Equilíbrio (2-5min) → Tardia (2-3h). Nem sempre todas as 3 são feitas.",
        blocks: [
          { title: "As 3 fases — Decorar!", color: "#8b5cf6", items: ["1️⃣ FLUXO: sequencial 2-5s por 1 min → vascularização → infecção/inflamação", "2️⃣ EQUILÍBRIO: 2-5 min → hiperemia/partes moles → infecção/inflamação", "3️⃣ TARDIA: 2-3h → fixação óssea → metástases, tumores, Paget", "Sem infecção: só fase tardia. Com infecção: protocolo completo."] },
          { title: "Padrão normal", color: "#7c3aed", items: ["Captação simétrica pelo esqueleto", "Maior captação: sacroilíacas, coluna, ombros, esterno", "👶 Crianças: epífises com MUITA captação = NORMAL (crescimento)", "Rins, ureteres, bexiga sempre visíveis"] },
        ],
      },
      {
        id: "meta", icon: "🎯", label: "Metástases & Padrões", color: "#ef4444",
        summary: "Salpicado = metástases. Superscan = difuso sem bexiga. Paget = contínuo. Osteomielite = 3 fases +.",
        blocks: [
          { title: "Metástases — Padrão salpicado", color: "#ef4444", items: ["Próstata e Mama → mais frequentes", "Esqueleto AXIAL preferencialmente (plexos venosos)", "Padrão salpicado: múltiplos focos hipercaptantes"] },
          { title: "⭐ SUPERSCAN — Não confundir!", color: "#dc2626", items: ["Fase avançada de metástase difusa", "Parece imagem normal para olhos não treinados!", "DIFERENÇA: AUSÊNCIA de bexiga e rins", "Todo MDP fixou no osso — nada sobrou para eliminar"] },
          { title: "Paget vs Metástase", color: "#b91c1c", items: ["PAGET: padrão CONTÍNUO — compromete osso inteiro", "METÁSTASE: padrão SALPICADO — focos múltiplos", "OSTEOMIELITE: 3 fases POSITIVAS", "CELULITE: fluxo/equilíbrio+ mas tardia NEGATIVA"] },
        ],
      },
    ],
  },

  {
    id: 4,
    titulo: "Cintilografia Cardíaca",
    subtitulo: "Perfusão Miocárdica · Isquemia vs Fibrose · Viabilidade · Territórios Coronarianos",
    cor: "#e11d48",
    icone: "🫀",
    tags: ["Sestamibi = perfusão", "Tl-201 = viabilidade", "Transitório = isquemia | Fixo = fibrose", "DAE→Ant/Septo | CxE→Lateral | ACD→Inferior", "FE normal VE: 50-65%"],
    secoes: [
      {
        id: "rf_card", icon: "💉", label: "Radiofármacos Cardíacos", color: "#e11d48",
        summary: "Sestamibi = perfusão (mais usado). Tl-201 = viabilidade. MIBG = inervação. Hemácias = FE.",
        blocks: [
          { title: "⭐ Tc-Sestamibi — Perfusão", color: "#e11d48", items: ["Difusão passiva → MITOCÔNDRIAS", "Redistribuição MÍNIMA → ideal para comparar 2 momentos", "Mais usado atualmente para perfusão", "Excreção hepatobiliar"] },
          { title: "Tl-201 — Viabilidade", color: "#be123c", items: ["Análogo do K⁺ → bomba Na/K (transporte ativo)", "Alta extração 1ª passagem (~88%)", "SOFRE REDISTRIBUIÇÃO → membrana íntegra = VIÁVEL", "Ideal para miocárdio HIBERNANTE"] },
          { title: "Outros RFs cardíacos", color: "#9f1239", items: ["Tc-Tetrofosmin → perfusão (sem aquecimento)", "I-123-MIBG → INERVAÇÃO → Chagas, IC", "Tc-Hemácias → VENTRICULOGRAFIA → FE normal VE: 50-65%", "⚠️ Ventriculografia: limitação em arritmias (FA)"] },
        ],
      },
      {
        id: "exam_card", icon: "🏃", label: "Esforço vs Repouso vs Prona", color: "#0ea5e9",
        summary: "Esforço expõe isquemia. Repouso compara. Prona reduz artefatos de atenuação.",
        blocks: [
          { title: "Fase de esforço", color: "#0ea5e9", items: ["Objetivo: criar heterogeneidade de fluxo coronariano", "Esforço físico: ↑ até 3× o fluxo coronariano", "Farmacológico: Dipiridamol/Adenosina (vasodilatadores)", "Dobutamina (inotrópico — quando não pode exercitar)", "⚠️ Suspender CAFEÍNA antes de dipiridamol/adenosina!"] },
          { title: "Prona & Eixos", color: "#0284c7", items: ["PRONA: sobrepeso/mama grande → reduz atenuação", "Defeito que some na prona = ARTEFATO (não lesão)", "SA (eixo curto) = 'donut' → localiza a parede", "VLA (longo vertical) = 'banana' → anterior/inferior", "HLA (longo horizontal) = 'banana' → lateral/septo"] },
        ],
      },
      {
        id: "padroes_card", icon: "🔍", label: "Os 3 Padrões", color: "#f59e0b",
        summary: "Normal (homogêneo). Isquemia (transitório). Fibrose (fixo). Territórios: DAE=ant/septo, CxE=lateral, ACD=inferior.",
        blocks: [
          { title: "✅ Normal | 🟡 Isquemia | 🔴 Fibrose", color: "#f59e0b", items: ["NORMAL: homogêneo no esforço E no repouso", "ISQUEMIA: defeito no esforço ❌ → normal no repouso ✅ (REVERSÍVEL)", "FIBROSE: defeito no esforço ❌ → defeito no repouso ❌ (FIXO)", "Hibernante: hipoperfusão + capta FDG → VIÁVEL → revascularizar!"] },
          { title: "Territórios coronarianos", color: "#d97706", items: ["DAE (LAD) → parede ANTERIOR + SEPTO anterior", "CxE (LCX) → parede LATERAL", "ACD (RCA) → parede INFERIOR + SEPTO inferior", "Ápice → compartilhado DAE + ACD", "17 segmentos no mapa polar"] },
        ],
      },
    ],
  },

  {
    id: 5,
    titulo: "Cintilografia Renal",
    subtitulo: "DTPA · DMSA · MAG3 · Renograma · Captopril · Furosemida · Transplante",
    cor: "#06b6d4",
    icone: "🫘",
    tags: ["DTPA = filtração glomerular", "DMSA = parênquima", "MAG3 = secreção tubular", "Captopril = HAS renovascular", "Furosemida → física vs fisiológica", "Pico normal renograma: 3-5 min"],
    secoes: [
      {
        id: "rf_renal", icon: "💉", label: "Radiofármacos Renais", color: "#06b6d4",
        summary: "DTPA = filtração. DMSA = parênquima. MAG3 = secreção tubular. Mesmo DTPA em diferentes vias = diferentes exames!",
        blocks: [
          { title: "⭐ Tc-DTPA — Filtração glomerular", color: "#06b6d4", items: ["100% FILTRAÇÃO GLOMERULAR", "Não se liga a proteínas", "Sem secreção/reabsorção tubular", "Meia-vida biológica: 2h", "⚠️ Mesmo DTPA da ventilação (inalado) e mielocisternografia (intratecal)!"] },
          { title: "⭐ Tc-DMSA — Parênquima", color: "#0891b2", items: ["40-50% retido no CÓRTEX TUBULAR", "Permanece por 6h (excreção lenta)", "Imagens 3-4h após injeção", "Hipocaptante = parênquima NÃO FUNCIONANTE", "Indica: cicatriz, pielonefrite, refluxo"] },
          { title: "Tc-MAG3 & OIH", color: "#0e7490", items: ["MAG3: 100% SECREÇÃO TUBULAR → maior extração que DTPA", "Tc-EC = equivalente ao MAG3", "I-131-OIH: histórico (80% tubular + 20% glomerular)", "OIH: manter 4°C, proteger da luz, usar lugol"] },
        ],
      },
      {
        id: "renograma", icon: "📈", label: "Renograma — 3 Fases", color: "#8b5cf6",
        summary: "29 imagens de 1 min. Pico normal: 3-5 min. Pico alargado + sem queda = obstrução.",
        blocks: [
          { title: "As 3 fases do renograma", color: "#8b5cf6", items: ["1ª VASCULAR: subida abrupta em segundos → chegada do RF", "2ª CAPTAÇÃO: subida contínua → filtração/secreção → pico 3-5 min", "3ª EXCREÇÃO: queda acentuada → RF vai para a bexiga", "Renograma alterado: pico alargado + sem queda = OBSTRUÇÃO"] },
        ],
      },
      {
        id: "provas_renais", icon: "🧪", label: "Provas Funcionais", color: "#f59e0b",
        summary: "Captopril = HAS renovascular (bloqueia SRAA). Furosemida = obstrução física vs fisiológica.",
        blocks: [
          { title: "Teste do Captopril — HAS Renovascular", color: "#f59e0b", items: ["Indicação: suspeita de ESTENOSE DE ARTÉRIA RENAL", "50mg oral 1h ANTES do renograma", "Bloqueia ECA → sem vasoconstrição da eferente", "Se HAS renovascular → filtração CAI → renograma piora", "Positivo: pico alargado + ↑ tempo parenquimatoso", "Sempre comparar com estudo BASAL"] },
          { title: "Furosemida — Obstrução física vs fisiológica", color: "#d97706", items: ["Indicação: dilatação do trato urinário alto", "Furosemida IV 15 min após início do renograma (3ª fase)", "✅ RESPONDE (queda brusca) → obstrução FISIOLÓGICA", "❌ NÃO RESPONDE (curva plana) → obstrução FÍSICA"] },
        ],
      },
    ],
  },

  {
    id: 6,
    titulo: "MN no SNC",
    subtitulo: "SPECT Cerebral · Demências · Epilepsia · Parkinson · Mielocisternografia",
    cor: "#a855f7",
    icone: "🧠",
    tags: ["HMPAO/ECD = lipofílicos, BHE", "SPECT = SEMPRE tomográfico", "Ictal = HIPER | Interictal = HIPO", "Alzheimer = temporoparietal", "Lewy = occipital | Pick = frontal", "Depressão = HIPOperfusão frontal (Q29/Prova252!)"],
    secoes: [
      {
        id: "rf_snc", icon: "💉", label: "Radiofármacos & Protocolo", color: "#a855f7",
        summary: "HMPAO e ECD: lipofílicos, atravessam BHE, distribuem por fluxo. Sala escura 30 min antes. SEMPRE SPECT.",
        blocks: [
          { title: "HMPAO e ECD — Propriedades", color: "#a855f7", items: ["LIPOFÍLICOS → atravessam BHE INTACTA", "Distribuem-se por FLUXO SANGUÍNEO CEREBRAL", "Ficam presos nos neurônios do córtex", "Alta extração na 1ª passagem", "Proporção cinzenta/branca = 3:1"] },
          { title: "Protocolo & Padrão Normal", color: "#9333ea", items: ["Sala escura 30 min antes → menor estimulação cerebral", "SEMPRE SPECT (nunca só planar)", "Mais quente: OCCIPITAL e CEREBELO", "Fria (normal!): região medial do lobo temporal", "Pequenas assimetrias entre hemisférios = NORMAL"] },
        ],
      },
      {
        id: "demencias", icon: "🔵", label: "Demências — Diferencial", color: "#3b82f6",
        summary: "Alzheimer = temporoparietal. Lewy = occipital. Pick = frontal. Vascular = aleatório.",
        blocks: [
          { title: "Tabela de demências", color: "#3b82f6", items: ["ALZHEIMER: temporoparietal posterior bilateral → poupa occipital", "CORPOS DE LEWY: occipital → preserva temporal (≠ Alzheimer!)", "PICK (Frontotemporal): frontal uni ou bilateral", "VASCULAR: focos aleatórios (múltiplos AVCs)", "HUNTINGTON: núcleo caudado + putamen (não córtex)"] },
        ],
      },
      {
        id: "epilepsia_snc", icon: "⚡", label: "Epilepsia & Outras", color: "#f59e0b",
        summary: "Ictal (durante crise) = HIPER. Interictal (entre crises) = HIPO. Parkinson = TRODAT. Depressão = HIPO frontal.",
        blocks: [
          { title: "⭐ Epilepsia — Ictal vs Interictal", color: "#f59e0b", items: ["ICTAL: neurônios em disparo → HIPERCAPTAÇÃO → acurácia 97%", "INTERICTAL: neurônios 'cansados' → HIPOCAPTAÇÃO → sensibilidade 50%", "Macete: Ictal = HIPER (fogo) / Interictal = HIPO (apagado)", "PET não pode ser feito no ictal (logística impossível)"] },
          { title: "Outras indicações", color: "#d97706", items: ["PARKINSON → Tc-TRODAT (sistema dopaminérgico — NÃO usa HMPAO!)", "DEPRESSÃO → HIPO frontal bilateral (não HIPER! — Q29 Prova 252)", "MORTE ENCEFÁLICA → ausência TOTAL de captação", "AVC → detecta precocemente mas 'perfusão de luxo' atrapalha acompanhamento"] },
          { title: "Mielocisternografia", color: "#b45309", items: ["RF: DTPA INTRATECAL (punção lombar)", "Indicações: HPN, perviedade DVP, fístula liquórica", "HPN: RF reflui para ventrículos (não vai às convexidades)", "Imagens: 1h, 3h e 24h após injeção"] },
        ],
      },
    ],
  },

  {
    id: 7,
    titulo: "Terapia em MN",
    subtitulo: "Teranóstico · Radioiodo · Dor Óssea · Neuroendócrino · Ra-223 · PRRT",
    cor: "#f43f5e",
    icone: "⚕️",
    tags: ["Terapia = alfa e beta-", "Teranóstico = diag + terapia no mesmo RF", "Baixo risco CDT = sem I-131", "Alto risco = 150-300 mCi", ">50 mCi = internação", "Ra-223 = alfa = ganho de sobrevida CPRC"],
    secoes: [
      {
        id: "principio_ter", icon: "⚛️", label: "Princípio & Teranóstico", color: "#f43f5e",
        summary: "Terapia usa alfa e beta- (alta ionização, baixa penetração). Teranóstico = diagnóstico + terapia no mesmo RF.",
        blocks: [
          { title: "Por que alfa e beta-?", color: "#f43f5e", items: ["Alta IONIZAÇÃO → destrói células-alvo", "Baixa PENETRAÇÃO → poupa tecido vizinho", "Oposto do diagnóstico (que usa gama)", "MN foca em tratamento SISTÊMICO (tumor + metástases)"] },
          { title: "Teranóstico — Exemplos", color: "#e11d48", items: ["I-131: gama (diagnóstico) + beta- (tratamento) → clássico", "Ga-68-DOTATOC (diagnóstico) + Lu-177-DOTATATE (terapia)", "Ga-68-PSMA (diagnóstico) + Lu-177-PSMA (terapia)", "Medicina personalizada — mesmo RF para as duas funções"] },
        ],
      },
      {
        id: "radioiodo", icon: "🦋", label: "Radioiodoterapia — I-131", color: "#f97316",
        summary: "Hipertireoidismo (≤50 mCi). CDT: baixo risco = sem I-131, alto risco = 150-300 mCi. >50 mCi = internação.",
        blocks: [
          { title: "Hipertireoidismo", color: "#f97316", items: ["Objetivo: tornar EUTIREOIDEO com 1 dose", "Dose: até 50 mCi → SEM internação", "Doença de Graves: >90% de cura", "Crianças: preferir cirurgia ou medicamento"] },
          { title: "⭐ CDT — Estratificação de risco", color: "#ea580c", items: ["BAIXO RISCO → SEM indicação de I-131", "INTERMEDIÁRIO → 30-100 mCi", "ALTO RISCO → 150-300 mCi (SEMPRE indicado)", ">50 mCi → INTERNAÇÃO em quarto terapêutico", "Preparo: elevar TSH, dieta pobre em iodo", "Mulher: não engravidar por 6-12 meses após"] },
        ],
      },
      {
        id: "outros_ter", icon: "🦴", label: "Dor Óssea & Outros", color: "#8b5cf6",
        summary: "Ra-223 = único alfa = melhor sobrevida no CPRC. MIBG e PRRT para neuroendócrinos.",
        blocks: [
          { title: "⭐ Ra-223 (Xofigo) vs Sr/Sm", color: "#8b5cf6", items: ["Sr-89 e Sm-153: emissores beta- → maior toxicidade hematológica, sem sobrevida", "Ra-223: emite ALFA → menor toxicidade, GANHO DE SOBREVIDA (↓30% risco de morte)", "Ra-223: CPRC + MTX ósseas SINTOMÁTICAS + SEM MTX viscerais"] },
          { title: "Neuroendócrinos & Outros", color: "#7c3aed", items: ["I-131-MIBG: feocromocitoma, paraganglioma, neuroblastoma", "⚠️ 10% neuroblastomas: FALSO-NEGATIVO (sem transportador NE)", "Lu-177-DOTATATE (PRRT): tumores neuroendócrinos", "Y-90-Zevalin: linfoma não-Hodgkin", "Radiosinovectomia: Y-90 ou Sm-153 (sinovite/hemofilia)"] },
        ],
      },
    ],
  },

  {
    id: 8,
    titulo: "Aplicações do PET",
    subtitulo: "¹⁸F-FDG · Preparo · Oncologia · Cardiologia · Neurologia · RFs não-FDG",
    cor: "#06b6d4",
    icone: "🔵",
    tags: ["FDG = análogo da GLICOSE (não oxigênio!)", "Jejum: 6-8h (NÃO 12h!)", "Pulmão = limpo → fácil ver metástase", "Cérebro = muito quente → metástase = RM", "Falso+: TB, inflamação", "Resposta terapêutica precoce → PET (não TC)"],
    secoes: [
      {
        id: "fdg", icon: "🍬", label: "¹⁸F-FDG — Mecanismo & Preparo", color: "#06b6d4",
        summary: "FDG = análogo da GLICOSE. GLUT → hexoquinase → FDG-6-fosfato aprisionado. Jejum 6-8h (não 12h!).",
        blocks: [
          { title: "Mecanismo de captação", color: "#06b6d4", items: ["FDG = FLUORDEOXIGLICOSE = análogo da GLICOSE (nunca de O₂!)", "PASSO 1: FDG entra pela GLUT (transportador de glicose)", "PASSO 2: hexoquinase → FDG-6-fosfato", "PASSO 3: FDG-6-fosfato APRISIONADO (não segue via glicolítica)", "Células tumorais: hiperexpressão de GLUT → muito mais FDG"] },
          { title: "⭐ Preparo — Decorar! (Q24 Prova 252)", color: "#0891b2", items: ["🍽️ Dieta pobre em CHO: 24h antes", "⏱️ Jejum: 6-8h (NÃO é 12h — pegadinha da prova!)", "📊 Medir GLICEMIA antes de injetar", "🌡️ Paciente AQUECIDO (evitar gordura marrom)", "🤫 NÃO FALAR (cordas vocais captam)", "🏃 NÃO EXERCITAR na véspera (musculatura)", "⏳ Aguardar ~1h após injeção para distribuição"] },
          { title: "Biodistribuição normal", color: "#0e7490", items: ["Muito quente: CÉREBRO (usa só glicose) e CORAÇÃO", "Moderado: FÍGADO e BAÇO", "Eliminação: RINS e BEXIGA (visíveis)", "✅ CAMPOS PULMONARES: LIMPOS → fácil ver metástase!", "⚠️ Cérebro muito quente → metástase cerebral → RM!", "PET feito da base do crânio à raiz da coxa"] },
        ],
      },
      {
        id: "onco_pet", icon: "🎯", label: "Oncologia & Limitações", color: "#ef4444",
        summary: "Alta captação = tumores agressivos. PET detecta antes da TC. Falso+: inflamação, TB. Falso-: mucinosos, carcinoides.",
        blocks: [
          { title: "Alta vs Baixa captação", color: "#ef4444", items: ["ALTA (agressivos): melanoma, linfomas, Ca colorretal, Ca pulmão pequenas células, Ca esôfago, Ca cabeça/pescoço, sarcoma alto grau", "BAIXA (diferenciados): Ca tireoide bem diferenciado, Ca próstata, Ca mama lobular, tumores mucinosos"] },
          { title: "Aplicações clínicas", color: "#dc2626", items: ["Rastreamento: pouco usado em geral — EXCEÇÃO: Ca PULMÃO!", "Estadiamento: tumor primário + metástases em 1 exame", "⭐ Resposta terapêutica PRECOCE: alteração metabólica ANTES da morfológica", "TC morfoestrutural NÃO deve ser usada para avaliar resposta precocemente", "Recidiva: detecta antes da TC"] },
          { title: "Falsos positivos e negativos", color: "#b91c1c", items: ["FALSOS POSITIVOS: inflamação, infecção, TB (clássico!), adenomas, gordura marrom, musculatura, cordas vocais", "FALSOS NEGATIVOS: carcinoides, mucinosos, hepatocarcinomas, micrometástases (<5mm), hiperglicemia"] },
        ],
      },
      {
        id: "nao_fdg_pet", icon: "⚛️", label: "RFs não-FDG & Q24 Prova 252", color: "#a855f7",
        summary: "Ga-68-DOTATOC, Ga-68-PSMA, ¹⁸F-Fluoreto, ¹¹C-Metionina. Q24: C é o gabarito (FDG = análogo da glicose).",
        blocks: [
          { title: "Radiofármacos não-FDG", color: "#a855f7", items: ["¹⁸F-Fluoreto → metástases ÓSSEAS (PET ósseo)", "⁶⁸Ga-DOTATOC → NEUROENDÓCRINOS (par diagnóstico do Lu-177)", "⁶⁸Ga-PSMA → Ca PRÓSTATA (par diagnóstico do Lu-177-PSMA)", "¹¹C-Metionina → TUMOR CEREBRAL (menor fundo que FDG)", "Rb-82, N-13-amônia → perfusão CARDÍACA no PET"] },
          { title: "Questão 24 — Prova 252 ⚠️", color: "#9333ea", items: ["A) Jejum absoluto 12h ❌ → jejum é 6-8h!", "B) FDG = análogo do OXIGÊNIO ❌ → é análogo da GLICOSE!", "C) FDG = análogo da glicose → acúmulo em tecidos metabolicamente ativos → imagens FUNCIONAIS ✅ GABARITO", "D) Jejum não é necessário ❌ → é fundamental!"] },
        ],
      },
    ],
  },
];

// ─── COMPONENTES ──────────────────────────────────────────────────────────────

function BlockCard({ block, open, onToggle }) {
  return (
    <div style={{ background: open ? `${block.color}12` : "rgba(255,255,255,0.02)", border: `1px solid ${open ? block.color + "55" : "rgba(255,255,255,0.06)"}`, borderTop: `3px solid ${block.color}`, borderRadius: "10px", overflow: "hidden", transition: "all 0.2s" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "transparent", border: "none", cursor: "pointer", gap: "8px" }}>
        <span style={{ color: open ? block.color : "#cbd5e1", fontWeight: 600, fontSize: "13px", fontFamily: "'DM Sans', sans-serif", textAlign: "left", flex: 1 }}>{block.title}</span>
        <span style={{ color: block.color, fontSize: "16px", flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <ul style={{ listStyle: "none", padding: "0 14px 14px", margin: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontSize: "12.5px", color: "#94a3b8", lineHeight: "1.5", padding: "4px 8px", background: "rgba(255,255,255,0.03)", borderRadius: "5px", fontFamily: "'DM Sans', sans-serif", borderLeft: item.startsWith("⭐") || item.includes("GABARITO") ? `2px solid ${block.color}` : "none" }}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SecaoCard({ sec }) {
  const [open, setOpen] = useState(false);
  const [openBlock, setOpenBlock] = useState(null);
  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={() => { setOpen(!open); setOpenBlock(null); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "13px 16px", background: open ? `${sec.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${open ? sec.color : "rgba(255,255,255,0.07)"}`, borderLeft: `4px solid ${sec.color}`, borderRadius: "12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
        <span style={{ fontSize: "18px" }}>{sec.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ color: sec.color, fontWeight: 600, fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>{sec.label}</div>
          {!open && <div style={{ color: "#475569", fontSize: "11.5px", marginTop: "2px", fontFamily: "'DM Sans', sans-serif" }}>{sec.summary}</div>}
        </div>
        <span style={{ color: sec.color, fontSize: "13px", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", padding: "10px 4px 4px" }}>
          {sec.blocks.map((block, i) => (
            <BlockCard key={i} block={block} open={openBlock === i} onToggle={() => setOpenBlock(openBlock === i ? null : i)} />
          ))}
        </div>
      )}
    </div>
  );
}

function AulaView({ aula }) {
  return (
    <div>
      {/* Header da aula */}
      <div style={{ textAlign: "center", marginBottom: "20px", padding: "22px 16px", background: `${aula.cor}09`, border: `1px solid ${aula.cor}33`, borderRadius: "16px" }}>
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>{aula.icone}</div>
        <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(16px, 3.5vw, 24px)", color: aula.cor, marginBottom: "6px" }}>Aula {aula.id} — {aula.titulo}</h2>
        <p style={{ color: "#475569", fontSize: "12px" }}>{aula.subtitulo}</p>
      </div>

      {/* Tags de revisão rápida */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px", padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ color: "#334155", fontSize: "10px", fontFamily: "'Space Mono', monospace", alignSelf: "center", marginRight: "4px" }}>KEY:</span>
        {aula.tags.map((tag, i) => (
          <span key={i} style={{ background: `${aula.cor}18`, color: aula.cor, padding: "2px 8px", borderRadius: "5px", fontSize: "11px", fontWeight: 600, border: `1px solid ${aula.cor}33` }}>{tag}</span>
        ))}
      </div>

      {/* Seções */}
      {aula.secoes.map(sec => <SecaoCard key={sec.id} sec={sec} />)}
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────

export default function App() {
  const [aulaAtiva, setAulaAtiva] = useState(1);
  const aula = aulas.find(a => a.id === aulaAtiva);

  return (
    <div style={{ minHeight: "100vh", background: "#070a0f", padding: "0 0 60px", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { transition: all 0.15s; } button:hover { opacity: 0.9; }
      `}</style>

      {/* Header fixo */}
      <div style={{ background: "rgba(7,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)" }}>
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#475569" }}>☢️ MEDICINA NUCLEAR — MAPAS MENTAIS</span>
        </div>
        {/* Navegação por abas */}
        <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingBottom: "2px" }}>
          {aulas.map(a => (
            <button key={a.id} onClick={() => setAulaAtiva(a.id)} style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: "5px",
              padding: "6px 12px", borderRadius: "8px",
              background: aulaAtiva === a.id ? `${a.cor}25` : "rgba(255,255,255,0.03)",
              border: `1px solid ${aulaAtiva === a.id ? a.cor : "rgba(255,255,255,0.07)"}`,
              color: aulaAtiva === a.id ? a.cor : "#475569",
              fontSize: "12px", fontWeight: aulaAtiva === a.id ? 700 : 400,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>
              <span>{a.icone}</span>
              <span style={{ fontSize: "10px", opacity: 0.7 }}>{a.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: "20px 16px" }}>
        {aula && <AulaView aula={aula} />}
      </div>

      {/* Navegação inferior */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "0 16px" }}>
        <button onClick={() => setAulaAtiva(a => Math.max(1, a - 1))} disabled={aulaAtiva === 1} style={{ padding: "8px 16px", background: aulaAtiva === 1 ? "rgba(255,255,255,0.02)" : `${aula.cor}22`, border: `1px solid ${aulaAtiva === 1 ? "rgba(255,255,255,0.06)" : aula.cor + "55"}`, color: aulaAtiva === 1 ? "#334155" : aula.cor, borderRadius: "8px", cursor: aulaAtiva === 1 ? "default" : "pointer", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
          ← Aula {aulaAtiva - 1}
        </button>
        <span style={{ color: "#334155", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>{aulaAtiva} / 8</span>
        <button onClick={() => setAulaAtiva(a => Math.min(8, a + 1))} disabled={aulaAtiva === 8} style={{ padding: "8px 16px", background: aulaAtiva === 8 ? "rgba(255,255,255,0.02)" : `${aula.cor}22`, border: `1px solid ${aulaAtiva === 8 ? "rgba(255,255,255,0.06)" : aula.cor + "55"}`, color: aulaAtiva === 8 ? "#334155" : aula.cor, borderRadius: "8px", cursor: aulaAtiva === 8 ? "default" : "pointer", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
          Aula {aulaAtiva + 1} →
        </button>
      </div>
    </div>
  );
}
