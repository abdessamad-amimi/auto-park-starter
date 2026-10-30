import { ManagerVoiture } from "./managers/VoitureManager.js";
import * as selectors from "./view/selectors.js";

const manager = new ManagerVoiture();

const totalVoiture = manager.voitures.length;
const disponible =  manager.voitures.filter(v => v.statut === "Disponible").length;
const louee = manager.voitures.filter(v => v.statut === "Louée").length;
const maintenance = manager.voitures.filter(v => v.statut === "En maintenance").length;

selectors.totalVoiture.textContent = totalVoiture;
selectors.voitureDisponible.textContent = disponible;
selectors.voitureLoue.textContent = louee;
selectors.voitureMaintenance.textContent = maintenance;

const poucentageDisponible = (disponible * 100) / totalVoiture;
const poucentagelouee = (louee * 100) / totalVoiture;
const poucentageMaintenance = (maintenance * 100) / totalVoiture;

selectors.barDisponible.style.width = `${poucentageDisponible}%`;
selectors.barLouee.style.width = `${poucentagelouee}%`;
selectors.barMaintenance.style.width = `${poucentageMaintenance}%`;

const citadine = manager.voitures.filter(v => v.categorie === "Citadine").length;
const berline = manager.voitures.filter(v => v.categorie === "Berline").length;
const suv = manager.voitures.filter(v => v.categorie === "SUV").length;

selectors.categoryCitadine.textContent = citadine;
selectors.categoryBerline.textContent = berline;
selectors.categorySUV.textContent = suv;