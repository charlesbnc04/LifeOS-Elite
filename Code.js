<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LifeOS V99 - Market Intelligence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

        /* --- FOND V90 --- */
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #050505; background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%); color: #fff; -webkit-font-smoothing: antialiased; min-height: 100vh; }
        .glass-base { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border-radius: 2rem; }
        
        /* --- HERO CARD (CORRIGÉE) --- */
        .reco-container { margin-bottom: 2rem; display: none; animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .reco-card { border-radius: 1.5rem; padding: 1.5rem; position: relative; overflow: hidden; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
        .reco-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .reco-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: black; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }

        /* --- UI ELEMENTS --- */
        .pro-search-input { width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px 20px; color: white; font-family: 'JetBrains Mono', monospace; font-size: 1rem; transition: 0.3s; }
        .pro-search-input:focus { border-color: #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); outline: none; }
        .autocomplete-items { position: absolute; border: 1px solid #333; border-top: none; z-index: 99; top: 100%; left: 0; right: 0; background-color: #09090b; border-radius: 0 0 12px 12px; max-height: 300px; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.9); }
        .autocomplete-item { padding: 14px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; transition: 0.2s; }
        .autocomplete-item:hover { background-color: rgba(59, 130, 246, 0.2); }
        .bell-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; background: rgba(0,0,0,0.3); color: #6b7280; }
        .bell-btn:hover { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-color: #3b82f6; }
        .bell-active { background: #3b82f6 !important; color: white !important; border-color: #3b82f6 !important; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }

        /* --- CLASSIQUES --- */
        .flow-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 1.5rem; padding: 1.5rem; cursor: pointer; }
        .timeline-row { display: flex; gap: 1.5rem; position: relative; padding-bottom: 2rem; }
        .timeline-line { position: absolute; left: 63px; top: 20px; bottom: -20px; width: 2px; background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.02)); }
        .timeline-time { width: 50px; text-align: right; font-family: monospace; font-size: 0.85rem; font-weight: 700; opacity: 0.6; padding-top: 1.5rem; }
        .timeline-dot { position: absolute; left: 58px; top: 28px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #000; z-index: 10; }
        .dot-task { background: #3b82f6; } .accent-task { border-left: 3px solid #3b82f6; }
        .dot-important { background: #ef4444; box-shadow: 0 0 20px #ef4444; animation: pulseRed 2s infinite; }
        .accent-important { border-left: 3px solid #ef4444; background: linear-gradient(90deg, rgba(239,68,68,0.1), transparent); }
        .dot-routine { background: #eab308; } .accent-routine { border-left: 3px solid #eab308; }
        .dot-meal { background: #10b981; } .accent-meal { border-left: 3px solid #10b981; }
        .dot-sport { background: #f97316; } .accent-sport { border-left: 3px solid #f97316; }
        @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

        .glass-panel { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; overflow: hidden; backdrop-filter: blur(10px); }
        .watchlist-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: 0.2s; }
        .watchlist-item:hover { background: rgba(255,255,255,0.05); }
        .nav-active { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); color: white; }
        .nav-btn { color: #9ca3af; } .nav-btn:hover { color: white; }
        .day { aspect-ratio: 1; border-radius: 0.8rem; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; cursor: pointer; transition: 0.2s; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
        .day-today { color: #60a5fa; font-weight: 800; border-color: #60a5fa; }
        .day-selected { background: white !important; color: black !important; font-weight: 900; box-shadow: 0 0 15px rgba(255,255,255,0.3); }

        #toast { visibility: hidden; min-width: 250px; background-color: #3b82f6; color: #fff; text-align: center; border-radius: 50px; padding: 16px; position: fixed; z-index: 999; left: 50%; bottom: 30px; transform: translateX(-50%); box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-weight: bold; font-size: 0.9rem; opacity: 0; transition: opacity 0.5s, bottom 0.5s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        #toast.show { visibility: visible; opacity: 1; bottom: 50px; }
    </style>
</head>
<body class="p-4 md:p-8">
    <div id="toast">🔔 Notification</div>

    <div class="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <aside class="lg:col-span-3 flex flex-col gap-6 h-[calc(100vh-4rem)] sticky top-8">
            <div class="glass-base p-8 space-y-6 flex-1 flex flex-col">
                <div class="flex justify-between items-center"><h1 class="text-2xl font-bold tracking-tight">Life<span class="text-blue-500 italic">OS</span></h1><button onclick="openProfile()" class="text-[10px] font-bold bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20">⚙️ PROFIL</button></div>
                <div class="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-2xl">
                    <button onclick="switchView('planning')" id="nav-planning" class="nav-btn nav-active py-2 rounded-xl text-xs font-bold transition-all">📅 Planning</button>
                    <button onclick="switchView('market')" id="nav-market" class="nav-btn py-2 rounded-xl text-xs font-bold transition-all">📈 Bourse</button>
                </div>
                <div><p class="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Calendrier</p><div id="calendar" class="grid grid-cols-7 gap-1"></div></div>
                <div class="flex-1">
                    <p class="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Assistant Agenda</p>
                    <textarea id="userInput" class="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none resize-none focus:border-blue-500/50 transition-colors h-32" placeholder="Ex: 'Entraînement de foot mardi à 19h...'"></textarea>
                    <button id="aiBtn" onclick="traiterBatchIA()" class="primary-btn w-full mt-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex justify-center gap-2"><span>✨</span> Planifier</button>
                </div>
                <div class="pt-6 border-t border-white/5"><div class="flex justify-between items-end mb-2"><span class="text-[10px] font-bold uppercase text-blue-400">Eau</span><div><span id="waterText" class="text-2xl font-black">0L</span><span id="waterTarget" class="text-xs opacity-50">/ 2.5L</span></div></div><div class="h-2 w-full bg-black/40 rounded-full overflow-hidden mb-3"><div id="waterBar" class="water-progress h-full w-0"></div></div><div class="grid grid-cols-2 gap-2"><button onclick="addWater(0.25)" class="py-2 bg-white/5 rounded-lg text-[10px] font-bold hover:bg-blue-500/20">+ Verre</button><button onclick="addWater(0.5)" class="py-2 bg-white/5 rounded-lg text-[10px] font-bold hover:bg-blue-500/20">+ Gourde</button></div></div>
            </div>
        </aside>

        <main class="lg:col-span-9 space-y-6 pb-10">
            
            <div id="view-planning" class="glass-base p-8 md:p-10 transition-colors duration-500">
                <div id="market-hero" class="reco-container"></div>

                <div class="flex flex-col md:flex-row justify-between md:items-end mb-6 pb-6 gap-6">
                    <div>
                        <div class="flex items-center gap-2 mb-2"><span id="dayIndicator" class="w-2 h-2 rounded-full bg-blue-500"></span><span class="text-[10px] font-bold uppercase tracking-widest opacity-60">Planning Live</span></div>
                        <h2 id="hudDate" class="text-4xl md:text-6xl font-black tracking-tight text-white">Date</h2>
                        <div id="contextBanner" class="mt-4 flex items-center gap-3"><span class="text-3xl">⚖️</span><div><p class="text-lg font-bold text-blue-400" id="contextTitle">Standard</p><p class="text-xs opacity-50" id="contextSubtitle">Équilibre</p></div></div>
                    </div>
                    <div class="flex gap-8 text-right bg-black/20 p-4 rounded-2xl border border-white/5 h-fit"><div><p class="text-[9px] font-bold uppercase text-zinc-500 mb-1">Cible (TDEE)</p><p id="calTarget" class="text-2xl font-mono font-medium text-white">--</p></div></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div id="sonicTrigger" onclick="playContextMusic()" class="flow-card flex justify-between items-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 cursor-pointer"><div class="flex items-center gap-4"><div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center animate-pulse">🎵</div><div><p class="text-[9px] font-black uppercase tracking-widest opacity-60">Ambiance</p><p id="sonicLabel" class="text-sm font-bold">Chargement...</p></div></div><div class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-black">▶</div></div>
                    <div class="flow-card flex items-center gap-4 border border-green-500/20 bg-green-900/10"><div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-xl">💊</div><div><p class="text-[9px] font-bold uppercase text-green-400 mb-1">Bio-Stack</p><p id="hudSupplements" class="text-sm font-medium">--</p></div></div>
                </div>
                <div class="relative pl-4 pt-4"><p class="text-xs font-bold uppercase opacity-30 mb-8 tracking-widest pl-12">Flux Chronologique</p><div id="masterTimeline"></div></div>
            </div>

            <div id="view-market" class="hidden flex flex-col gap-6">
                 <div class="glass-panel p-2">
                    <div class="tradingview-widget-container">
                        <div class="tradingview-widget-container__widget"></div>
                        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
                        { "symbols": [ {"proName": "FOREXCOM:SPXUSD", "title": "S&P 500"}, {"proName": "BITSTAMP:BTCUSD", "title": "Bitcoin"}, {"proName": "TVC:GOLD", "title": "Or"} ], "showSymbolLogo": true, "colorTheme": "dark", "isTransparent": true, "displayMode": "adaptive", "locale": "fr" }
                        </script>
                    </div>
                </div>

                <div class="relative">
                    <input id="pf-symbol" type="text" class="pro-search-input" placeholder="🔍 Rechercher une action, crypto, ETF pour activer l'alerte..." autocomplete="off">
                    <div id="autocomplete-list" class="autocomplete-items hidden"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div class="lg:col-span-8 flex flex-col gap-4">
                        <div class="glass-panel p-1 h-[500px] border border-white/10 relative">
                            <div class="absolute top-2 left-4 z-10 bg-black/50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-blue-400" id="activeChartLabel">Analyse</div>
                            <div class="tradingview-widget-container" style="height:100%;width:100%"><div id="tv_main_chart" style="height:100%;width:100%"></div></div>
                        </div>
                        <div class="glass-panel p-4 flex flex-col h-[300px]">
                            <h3 class="text-xs font-bold uppercase text-zinc-500 mb-3 tracking-widest">Mes Alertes Actives</h3>
                            <div id="watchlist" class="flex-1 overflow-y-auto space-y-1"></div>
                        </div>
                    </div>
                    <div class="lg:col-span-4 flex flex-col gap-4">
                        <div class="glass-panel p-2 h-[200px] flex flex-col">
                            <h3 class="text-[10px] font-bold uppercase text-center text-yellow-400 mb-1">Jauge Technique</h3>
                            <div class="flex-1 tradingview-widget-container" style="height:100%;width:100%"><div id="tv_gauge" style="height:100%;width:100%"></div></div>
                        </div>
                        <div class="glass-panel p-2 h-[300px] flex flex-col">
                            <h3 class="text-[10px] font-bold uppercase text-center text-red-400 mb-1">Palmarès Volatilité</h3>
                            <div class="flex-1 tradingview-widget-container" style="height:100%;width:100%"><div class="tradingview-widget-container__widget"></div><script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js" async>{ "colorTheme": "dark", "dateRange": "12M", "exchange": "US", "showChart": false, "locale": "fr", "largeChartUrl": "", "isTransparent": true, "showSymbolLogo": true, "width": "100%", "height": "100%" }</script></div>
                        </div>
                        <div class="glass-panel p-2 h-[300px] flex flex-col">
                            <h3 class="text-[10px] font-bold uppercase text-center text-blue-400 mb-1">Agenda Éco</h3>
                            <div class="tradingview-widget-container" style="height:100%;width:100%"><div class="tradingview-widget-container__widget"></div><script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>{ "colorTheme": "dark", "isTransparent": true, "width": "100%", "height": "100%", "locale": "fr", "importanceFilter": "0,1", "currencyFilter": "USD,EUR" }</script></div>
                       </div>
                    </div>
                </div>
            </div>

        </main>
    </div>

    <div id="taskModal" class="hidden fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"><div class="glass-base p-8 max-w-lg w-full rounded-[2rem] border border-white/20 shadow-2xl relative"><button onclick="closeTaskModal()" class="absolute top-6 right-6 text-zinc-500 hover:text-white text-xl">✕</button><h2 class="text-2xl font-black italic mb-8">Détail & Édition</h2><div class="space-y-6"><div><label class="text-[10px] font-bold uppercase text-blue-400 mb-2 block">Horaire</label><input type="time" id="modalTime" class="w-full bg-white/5 p-4 rounded-xl text-white text-xl outline-none border border-white/10 focus:border-blue-500"></div><div><label class="text-[10px] font-bold uppercase text-blue-400 mb-2 block">Titre</label><input type="text" id="modalShort" class="w-full bg-white/5 p-4 rounded-xl text-white outline-none border border-white/10 focus:border-blue-500 font-bold"></div><div><label class="text-[10px] font-bold uppercase text-blue-400 mb-2 block">Note Complète</label><textarea id="modalFull" class="w-full bg-white/5 p-4 rounded-xl text-white outline-none border border-white/10 focus:border-blue-500 h-32 resize-none"></textarea></div></div><div class="flex gap-4 mt-8"><button onclick="saveTaskModal()" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all">Sauvegarder</button><button onclick="deleteTaskModal()" class="px-6 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all">Supprimer</button></div></div></div>
    <div id="profileModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"><div class="glass-base p-8 max-w-sm w-full rounded-[2rem] text-center"><h2 class="text-xl font-bold mb-6">Profil & Sauvegarde</h2><div class="space-y-3 mb-6"><input type="password" id="inputApiKey" class="w-full bg-black/20 p-4 rounded-xl text-center text-white outline-none border border-blue-500/30 focus:border-blue-500" placeholder="Clé API OpenRouter"><input type="number" id="inputWeight" class="w-full bg-black/20 p-4 rounded-xl text-center text-white outline-none border border-white/10" placeholder="Poids"><input type="number" id="inputHeight" class="w-full bg-black/20 p-4 rounded-xl text-center text-white outline-none border border-white/10" placeholder="Taille"><input type="number" id="inputAge" class="w-full bg-black/20 p-4 rounded-xl text-center text-white outline-none border border-white/10" placeholder="Âge"><select id="inputSex" class="w-full bg-black/20 p-4 rounded-xl text-center text-white outline-none border border-white/10"><option value="male">Homme</option><option value="female">Femme</option></select></div><button onclick="saveProfile()" class="primary-btn w-full py-4 rounded-xl font-bold uppercase text-xs mb-4">Sauvegarder</button><div class="grid grid-cols-2 gap-2"><button onclick="exportData()" class="bg-white/10 py-3 rounded-xl text-[10px] font-bold">📥 Sauvegarder</button><button onclick="document.getElementById('importFile').click()" class="bg-white/10 py-3 rounded-xl text-[10px] font-bold">📤 Restaurer</button><input type="file" id="importFile" class="hidden" onchange="importData(this)"></div></div></div>

    <script>
        // --- LIEN GOOGLE ---
        const API_URL = "https://script.google.com/macros/s/AKfycbyKK3V8CMpGAFBLaKjE1GUSGcM5MGMSsUT7sRJ4rlmr9jRuJKbkZs7Vj17--goeOdGt/exec";

        // --- DATA ---
        let db = JSON.parse(localStorage.getItem('lifeos_v70_db') || "{}");
        let profile = JSON.parse(localStorage.getItem('lifeos_v70_profile') || '{"weight":80, "height":180, "age":30, "sex":"male"}');
        let health = JSON.parse(localStorage.getItem('lifeos_v70_health') || '{"water":0}');
        let manualMeals = JSON.parse(localStorage.getItem('lifeos_v70_manual_meals') || "{}");
        let musicProvider = localStorage.getItem('lifeos_music') || 'spotify';
        let apiKey = localStorage.getItem('lifeos_apikey') || ""; 
        let watchlist = JSON.parse(localStorage.getItem('lifeos_watchlist') || "[]");
        
        let currentChartSymbol = "TVC:CAC40";
        const now = new Date(); const todayNum = now.getDate(); const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]; let selectedDay = todayNum;
        let editingTaskId = null;

        // --- LISTES REPAS & ROUTINES ---
        const M_SPORT_L = ["Penne Complètes Bolognaise", "Riz Basmati & Steak 5%", "Double Wrap Poulet", "Gnocchis Dinde Pesto", "Couscous Royal Light"];
        const M_SPORT_D = ["Omelette 3 oeufs Pommes de Terre", "Cabillaud Rôti & Purée", "Bowl Quinoa Dinde", "Wok Nouilles Poulet", "Saucisse Lentilles"];
        const M_FOCUS_L = ["Saumon Rôti Quinoa", "Salade César Poulet", "Buddha Bowl Tofu", "Maquereau Grillé", "Carpaccio Boeuf"];
        const M_FOCUS_D = ["Velouté Potiron Coco", "Escalope Dinde Haricots", "Wok Légumes Cajou", "Velouté Asperges", "Colin Papillote"];
        const mealsDB = { sport: { lunch: M_SPORT_L, dinner: M_SPORT_D }, focus: { lunch: M_FOCUS_L, dinner: M_FOCUS_D }, diet: { lunch: M_FOCUS_L, dinner: M_FOCUS_D } };
        const ROUTINES = { sport: { m: [{l:"Mobilité Articulaire", q:"mobility routine"}, {l:"Salutation Soleil", q:"sun salutation"}], e: [{l:"Automassage", q:"foam rolling"}, {l:"Étirements Psoas", q:"psoas stretch"}] }, focus: { m: [{l:"Méditation Focus", q:"meditation focus"}, {l:"Cohérence Cardiaque", q:"coherence cardiaque"}], e: [{l:"Lecture Papier", q:"reading"}, {l:"Gratitude", q:"gratitude journaling"}] } };
        ROUTINES.diet = ROUTINES.focus;
        const MUSIC_DB = { sport: ["Workout Phonk", "90s Hip Hop Gym"], focus: ["Deep Focus", "Lofi Girl"], diet: ["Coffee Shop", "Acoustic Chill"] };
        const suppsDB = { sport: "⚡ Magnésium, Whey, Créatine", focus: "🧠 Omega-3, Vit D3, Matcha", diet: "🌿 Multivitamines, Probiotiques" };
        function getVits(m) { if(m.includes("Saumon")||m.includes("Thon"))return "Omega-3, Vit D"; if(m.includes("Pâtes")||m.includes("Riz"))return "Glucides, Vit B"; return "Vitamines"; }

        // --- BASE DE DONNÉES BOURSE MASSIVE ---
        const hugeStockDatabase = [
            { l: "S&P 500 (ETF)", s: "NYSEARCA:VOO", i: "Index" }, { l: "NASDAQ 100 (ETF)", s: "NASDAQ:QQQ", i: "Index" }, { l: "Amundi MSCI World", s: "EPA:CW8", i: "ETF PEA" }, { l: "Amundi S&P 500", s: "EPA:ESE", i: "ETF PEA" },
            { l: "Bitcoin USD", s: "BITSTAMP:BTCUSD", i: "Crypto" }, { l: "Ethereum USD", s: "BITSTAMP:ETHUSD", i: "Crypto" }, { l: "Solana USD", s: "BITSTAMP:SOLUSD", i: "Crypto" },
            { l: "Apple Inc", s: "NASDAQ:AAPL", i: "Tech" }, { l: "Microsoft Corp", s: "NASDAQ:MSFT", i: "Tech" }, { l: "Nvidia Corp", s: "NASDAQ:NVDA", i: "Semicon" }, { l: "Tesla Inc", s: "NASDAQ:TSLA", i: "Auto" },
            { l: "LVMH", s: "EPA:MC", i: "Luxe" }, { l: "TotalEnergies", s: "EPA:TTE", i: "Energie" }, { l: "L'Oréal", s: "EPA:OR", i: "Cosmétique" }
        ];

        // --- RECHERCHE ---
        const inp = document.getElementById("pf-symbol");
        const list = document.getElementById("autocomplete-list");
        inp.addEventListener("input", function(e) {
            const val = this.value.toUpperCase(); list.innerHTML = ""; list.classList.add('hidden'); if (!val) return;
            const matches = hugeStockDatabase.filter(item => item.l.toUpperCase().includes(val) || item.s.toUpperCase().includes(val));
            if (matches.length > 0) {
                list.classList.remove('hidden');
                matches.slice(0, 10).forEach(item => { 
                    const d = document.createElement("DIV"); d.className = "autocomplete-item";
                    const isActive = watchlist.some(w => w.s === item.s);
                    const bellClass = isActive ? "bell-btn bell-active" : "bell-btn";
                    d.innerHTML = `<div class="flex items-center gap-3" onclick="loadActiveAsset('${item.s}')" style="cursor:pointer; flex:1"><span class="font-mono font-bold text-blue-400">${item.s}</span><span class="text-sm opacity-70">${item.l}</span></div><button class="${bellClass}" onclick="toggleAlert('${item.s}', '${item.l}', this)">🔔</button>`;
                    list.appendChild(d);
                });
            }
        });
        document.addEventListener("click", function (e) { if(e.target !== inp) list.classList.add('hidden'); });

        function toggleAlert(symbol, name, btnElement) {
            btnElement.classList.add('bell-active');
            if(!watchlist.some(item => item.s === symbol)) {
                watchlist.push({s: symbol, l: name});
                localStorage.setItem('lifeos_watchlist', JSON.stringify(watchlist));
                renderWatchlist();
            }
            fetch(`${API_URL}?ticker=${symbol}`, { mode: 'no-cors' }).then(() => showToast(`Alerte activée pour ${name}`)).catch(e => console.log(e));
        }

        // --- SYNC INTELLIGENTE ---
        async function syncGoogleAgenda() {
            try {
                const reponse = await fetch(`${API_URL}?action=read`);
                const reco = await reponse.json(); 
                const heroContainer = document.getElementById('market-hero');

                if (reco && reco.ticker) {
                    const isPortfolio = (reco.type === "PORTFOLIO");
                    const isNegative = reco.percent < 0; 
                    const subtitle = reco.reason; 
                    const icon = isPortfolio ? "🔔" : "🧠"; 
                    const badgeText = isPortfolio ? "ALERTE FAVORIS" : "DÉCOUVERTE IA";
                    const colorTheme = isNegative ? "239, 68, 68" : "16, 185, 129"; // Rouge ou Vert
                    const percentSign = reco.percent > 0 ? "+" : "";
                    const bgStyle = `background: linear-gradient(135deg, rgba(${colorTheme}, 0.15), rgba(0,0,0,0)); border-color: rgba(${colorTheme}, 0.4);`;

                    heroContainer.innerHTML = `
                        <div class="reco-card" style="${bgStyle}">
                            <div class="reco-header"><div class="flex items-center gap-2"><span class="text-2xl">${icon}</span><span class="text-[10px] font-bold uppercase tracking-widest opacity-60">${badgeText}</span></div><span class="reco-badge" style="background: rgb(${colorTheme}); color: black;">${percentSign}${reco.percent.toFixed(2)}%</span></div>
                            <div class="flex justify-between items-end mt-4"><div><h3 class="text-3xl font-black text-white leading-tight tracking-tight">${reco.ticker.replace("NASDAQ:", "").replace("BITSTAMP:", "")}</h3><p class="text-sm font-bold opacity-80 mt-1" style="color: rgb(${colorTheme});">${subtitle}</p></div><div class="text-right"><button onclick="loadActiveAsset('${reco.ticker}'); switchView('market');" class="bg-white text-black px-6 py-3 rounded-xl font-bold text-xs uppercase hover:scale-105 transition-transform shadow-lg">Voir l'actif</button></div></div>
                        </div>`;
                    heroContainer.style.display = "block";
                    addMarketTaskToTimeline(reco);
                } else { heroContainer.style.display = "none"; }
            } catch (err) { console.log("Aucune recommandation majeure."); }
        }

        function addMarketTaskToTimeline(reco) {
            if(!db[todayNum]) db[todayNum] = [];
            if(!db[todayNum].some(t => t.shortText.includes(reco.ticker))) {
                db[todayNum].push({ shortText: `${reco.ticker} (${reco.percent.toFixed(1)}%)`, fullText: `Signal ${reco.type} : ${reco.reason}`, time: "09:00", duration: 15, done: false, isMarket: true });
                save(); renderHUD();
            }
        }

        // --- RENDER HUD (COMPLET) ---
        function renderHUD() { try { 
            const isToday=(selectedDay===todayNum); document.getElementById('hudStatus').innerText=isToday?"LIVE":"PLANNING"; document.getElementById('dayIndicator').className=isToday?"w-2 h-2 rounded-full bg-green-500 animate-pulse":"w-2 h-2 rounded-full bg-blue-500"; document.getElementById('hudDate').innerText=`${selectedDay} ${monthNames[now.getMonth()]}`; const tasks=db[selectedDay]||[]; 
            let mode='diet'; let sportTaskTime=null; tasks.forEach(t=>{const fl=(t.fullText||"").toLowerCase(); if(fl.match(/sport|crossfit|gym|muscu/)){mode='sport';sportTaskTime=t.time;}}); if(mode==='diet'&&tasks.some(t=>t.fullText.match(/réunion|bureau/i)))mode='focus'; 
            const styles={sport:{t:"Haute Énergie",c:"text-orange-500",i:"🔥",b:"sonic-sport"},focus:{t:"Deep Focus",c:"text-purple-500",i:"🧠",b:"sonic-focus"},diet:{t:"Vitalité & Diet",c:"text-green-500",i:"🌿",b:"sonic-chill"}}; 
            document.getElementById('contextTitle').innerText=styles[mode].t; document.getElementById('contextTitle').className=`text-lg font-bold ${styles[mode].c}`; document.querySelector('#contextBanner span').innerText=styles[mode].i; document.getElementById('sonicTrigger').className=`sonic-bar p-4 rounded-2xl flex justify-between items-center mb-6 shadow-xl ${styles[mode].b}`; document.getElementById('sonicLabel').innerText=`Playlist: ${MUSIC_DB[mode][(selectedDay-1)%MUSIC_DB[mode].length]}`; 
            let bmr=(10*profile.weight)+(6.25*profile.height)-(5*profile.age)+(profile.sex==='male'?5:-161); let tdee=Math.round(bmr*(mode==='sport'?1.7:1.3)); document.getElementById('calTarget').innerText=`${tdee} kcal`; document.getElementById('hudSupplements').innerText=suppsDB[mode]; 
            const rot=(selectedDay-1)%5; const rIndex=(selectedDay-1)%2; let l=(manualMeals[selectedDay]&&manualMeals[selectedDay].lunch)?manualMeals[selectedDay].lunch:(mealsDB[mode].lunch[rot]||mealsDB[mode].lunch[0]); let d=(manualMeals[selectedDay]&&manualMeals[selectedDay].dinner)?manualMeals[selectedDay].dinner:(mealsDB[mode].dinner[rot]||mealsDB[mode].dinner[0]); const rM=ROUTINES[mode].m[rIndex]; const rE=ROUTINES[mode].e[rIndex]; 
            let injectedItems=[]; if(mode==='sport'&&sportTaskTime){const [h,m]=sportTaskTime.split(':').map(Number); if(h>=18){let snackH=h-3; injectedItems.push({type:'snack',time:`${snackH.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`,content:"Collation Pré-Match",sub:"Banane, Miel, Amandes",color:'dot-snack',accent:'accent-snack'});}} 
            let stream=[]; stream.push({type:'routine',time:'07:30',content:rM.l,query:rM.q,icon:'☀️',accent:'accent-routine',dot:'dot-routine'}); stream.push({type:'meal',time:"12:30",content:l,sub:getVits(l),kcal:Math.round(tdee*0.4),accent:'accent-meal',dot:'dot-meal',id:'lunch'}); stream.push(...injectedItems); stream.push({type:'meal',time:"20:00",content:d,sub:getVits(d),kcal:Math.round(tdee*0.35),accent:'accent-meal',dot:'dot-meal',id:'dinner'}); stream.push({type:'routine',time:'22:30',content:rE.l,query:rE.q,icon:'🌙',accent:'accent-routine',dot:'dot-routine'}); 
            
            tasks.forEach((t,i)=>{
                let accent=t.fullText.match(/sport/i)?'accent-sport':'accent-task'; let dot=t.fullText.match(/sport/i)?'dot-sport':'dot-task'; 
                if(t.isMarket) { accent='accent-important'; dot='dot-important'; }
                let displayContent=t.shortText; if(t.duration>0){const [h,m]=t.time.split(':').map(Number); const endMin=h*60+m+t.duration; const endH=Math.floor(endMin/60)%24; const endM=endMin%60; displayContent+=` <span class="opacity-50 text-[10px] ml-2">(${t.time} ➔ ${endH}:${endM.toString().padStart(2,'0')})</span>`;} 
                stream.push({type:'task',time:t.time,content:displayContent,full:t.fullText,accent:accent,dot:dot,id:i,done:t.done});
            }); 
            stream.sort((a,b)=>{const [hA,mA]=a.time.split(':').map(Number); const [hB,mB]=b.time.split(':').map(Number); return (hA*60+mA)-(hB*60+mB);}); 
            
            document.getElementById('masterTimeline').innerHTML=stream.map(item=>{const [h,m]=item.time.split(':').map(Number); let cardContent=''; if(item.type==='routine'){cardContent=`<div class="flex justify-between items-center"><div class="flex items-center gap-4"><div class="text-xl opacity-80">${item.icon}</div><div><p class="text-[9px] font-bold uppercase opacity-50">Routine</p><p class="font-bold text-lg">${item.content}</p></div></div><button onclick="event.stopPropagation(); window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(item.query)}','_blank')" class="video-btn">▶ Vidéo</button></div>`;} else if(item.type==='meal'){cardContent=`<div class="flex flex-col md:flex-row md:items-center justify-between gap-4" onclick="editItem('meal', '${item.id}')"><div><div class="flex items-center gap-2 mb-1"><p class="text-[9px] font-bold uppercase opacity-50">Repas</p><span class="text-[9px] font-mono opacity-40 bg-white/10 px-2 rounded">${item.kcal} kcal</span></div><p class="font-bold text-lg leading-tight mb-1">${item.content}</p><p class="text-[10px] text-zinc-400 font-mono">${item.sub}</p></div><button onclick="event.stopPropagation(); window.open('https://www.youtube.com/results?search_query=recette+${encodeURIComponent(item.content)}','_blank')" class="cook-btn self-start md:self-center">▶ Cuisiner</button></div>`;} else if(item.type==='task'){cardContent=`<div class="flex items-center gap-4 group" onclick="openTaskModal(${item.id})"><input type="checkbox" ${item.done?'checked':''} onchange="event.stopPropagation(); toggleTask(${selectedDay}, ${item.id})" class="w-5 h-5 rounded border border-white/20 bg-transparent checked:bg-white appearance-none cursor-pointer transition-all"><span class="${item.done?'line-through opacity-30':'font-bold text-lg'}">${item.content}</span><button onclick="event.stopPropagation(); delTask(${selectedDay},${item.id})" class="ml-auto text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button></div>`;} else if(item.type==='snack'){cardContent=`<div class="flex items-center gap-4"><div class="text-2xl">🍌</div><div><p class="text-[9px] font-bold uppercase opacity-50">Carburant</p><p class="font-bold text-lg">${item.content}</p></div></div>`;} return `<div class="timeline-row"><div class="timeline-time">${item.time}</div><div class="timeline-line"></div><div class="timeline-dot ${item.dot}"></div><div class="flex-1 flow-card ${item.accent} ${item.done?'opacity-40':''}">${cardContent}</div></div>`;}).join(''); updateWaterUI(); } catch (e) { console.error(e); }}

        // --- HELPERS ---
        function updateWaterUI() { const current = health.water || 0; const target = 2.5; const pct = Math.min((current / target) * 100, 100); document.getElementById('waterBar').style.width = `${pct}%`; document.getElementById('waterText').innerText = `${current}L`; }
        function showToast(message) { var x = document.getElementById("toast"); x.innerText = "🔔 " + message; x.className = "show"; setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000); }
        function refreshMarketWidgets() { const container = document.getElementById('tv_main_chart'); const gauge = document.getElementById('tv_gauge'); if(container) { container.innerHTML = ""; new TradingView.widget({ "autosize": true, "symbol": currentChartSymbol, "interval": "D", "timezone": "Europe/Paris", "theme": "dark", "style": "1", "locale": "fr", "toolbar_bg": "#f1f3f6", "enable_publishing": false, "container_id": "tv_main_chart", "hide_side_toolbar": false }); } if(gauge) { gauge.innerHTML = ""; const script = document.createElement('script'); script.type = 'text/javascript'; script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"; script.async = true; script.innerHTML = JSON.stringify({ "interval": "1D", "width": "100%", "isTransparent": true, "height": "100%", "symbol": currentChartSymbol, "showIntervalTabs": false, "displayMode": "single", "locale": "fr", "colorTheme": "dark" }); gauge.appendChild(script); } document.getElementById('activeChartLabel').innerText = `Analyse : ${currentChartSymbol}`; }
        function renderWatchlist() { const container = document.getElementById('watchlist'); container.innerHTML = ""; watchlist.forEach(item => { const div = document.createElement('div'); div.className = "watchlist-item group"; div.onclick = () => { loadActiveAsset(item.s); }; div.innerHTML = `<div class="flex items-center gap-3"><span class="text-blue-400 font-bold">🔔</span><div><p class="font-bold text-sm">${item.s}</p><p class="text-[10px] opacity-50">${item.l}</p></div></div><button onclick="event.stopPropagation(); removeFromWatchlist('${item.s}')" class="text-red-500 opacity-50 hover:opacity-100 text-xs">Retirer</button>`; container.appendChild(div); }); }
        function loadActiveAsset(symbol) { currentChartSymbol = symbol; refreshMarketWidgets(); }
        function removeFromWatchlist(symbol) { watchlist = watchlist.filter(item => item.s !== symbol); localStorage.setItem('lifeos_watchlist', JSON.stringify(watchlist)); renderWatchlist(); }
        function switchView(viewName) { const plan = document.getElementById('view-planning'); const market = document.getElementById('view-market'); if(viewName === 'planning') { plan.classList.remove('hidden'); market.classList.add('hidden'); } else { plan.classList.add('hidden'); market.classList.remove('hidden'); refreshMarketWidgets(); renderWatchlist(); } }
        async function traiterBatchIA() { const raw = document.getElementById('userInput').value; if (!raw.trim()) return; if (!apiKey) { alert("Clé API manquante"); openProfile(); return; } const btn = document.getElementById('aiBtn'); const originalText = btn.innerHTML; btn.innerHTML = "<span>🧠</span> Analyse..."; btn.classList.add('ai-loading'); btn.disabled = true; try { const response = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json", "HTTP-Referer": window.location.href, "X-Title": "LifeOS" }, body: JSON.stringify({ "model": "anthropic/claude-3.5-sonnet", "messages": [{ "role": "system", "content": `Tu es l'IA de LifeOS. Date: ${new Date().toLocaleDateString()}. JSON strict: [{"shortText":"Titre","fullText":"Origine","time":"HH:MM","duration":60,"dayOffset":0}].` }, { "role": "user", "content": raw }] }) }); const data = await response.json(); const tasks = JSON.parse(data.choices[0].message.content.replace(/```json|```/g, '').trim()); tasks.forEach(t => { let d = new Date(); d.setDate(now.getDate() + (t.dayOffset || 0)); const day = d.getDate(); if (!db[day]) db[day] = []; db[day].push({ shortText: t.shortText, fullText: t.fullText, time: t.time, duration: t.duration, done: false }); }); save(); renderHUD(); document.getElementById('userInput').value = ''; } catch (e) { alert(e); } finally { btn.classList.remove('ai-loading'); btn.disabled = false; btn.innerHTML = originalText; } }
        function editItem(t,i){if(t==='meal'){const n=prompt("Repas:");if(n){if(!manualMeals[selectedDay])manualMeals[selectedDay]={};manualMeals[selectedDay][i]=n;save();renderHUD();}}}
        function playContextMusic(){let q=document.getElementById('sonicLabel').innerText.replace('Playlist: ','');window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,'_blank');}
        function addWater(n){health.water+=n;save();updateWaterUI();}
        function renderCal(){const c=document.getElementById('calendar');c.innerHTML='';const m=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();for(let i=1;i<=m;i++){const d=document.createElement('div');let cl="day";if(i===todayNum)cl+=" day-today";if(i===selectedDay)cl+=" day-selected";if(db[i]&&db[i].length)cl+=" has-event";d.className=cl;d.innerText=i;d.onclick=()=>{selectedDay=i;renderCal();renderHUD();};c.appendChild(d);}}
        function toggleTask(d,i){db[d][i].done=!db[d][i].done;save();} function delTask(d,i){db[d].splice(i,1);save();}
        function save(){localStorage.setItem('lifeos_v70_db',JSON.stringify(db)); localStorage.setItem('lifeos_v70_profile',JSON.stringify(profile)); localStorage.setItem('lifeos_v70_health',JSON.stringify(health)); localStorage.setItem('lifeos_music',musicProvider); localStorage.setItem('lifeos_apikey',apiKey); renderCal(); renderHUD();}
        function openProfile(){document.getElementById('profileModal').classList.remove('hidden');document.getElementById('inputApiKey').value=apiKey;} function saveProfile(){apiKey=document.getElementById('inputApiKey').value;document.getElementById('profileModal').classList.add('hidden');save();}
        function openTaskModal(i){editingTaskId=i;const t=db[selectedDay][i];document.getElementById('modalTime').value=t.time;document.getElementById('modalShort').value=t.shortText;document.getElementById('modalFull').value=t.fullText;document.getElementById('taskModal').classList.remove('hidden');}
        function closeTaskModal(){document.getElementById('taskModal').classList.add('hidden');}

        // INIT
        renderCal();
        renderHUD();
        renderWatchlist();
        syncGoogleAgenda(); 
    </script>
</body>
</html>
