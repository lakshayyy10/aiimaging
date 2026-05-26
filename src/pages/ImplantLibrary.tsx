import React, { useState } from 'react';
import { ArrowLeft, Search, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const kneeImplants = [
  { name: 'Depuy Attune', image: '/implant-library/knee_1_Depuy_Attune.png' },
  { name: 'Depuy LCS', image: '/implant-library/knee_1_Depuy_LCS.png' },
  { name: 'Depuy PFC CR Mobile Bearing', image: '/implant-library/knee_1_Depuy_PFC_CR_Mobile_bearing.jpg' },
  { name: 'Depuy Sigma Partial Knee', image: '/implant-library/knee_1_Depuy_sigma_partial_knee.jpg' },
  { name: 'Exatech Optetrak', image: '/implant-library/knee_1_Exatech_Optetrak.png' },
  { name: 'Howmedica Avon', image: '/implant-library/knee_1_Howmedica_Avon.png' },
  { name: 'Howmedica Duraccon', image: '/implant-library/knee_1_Howmedica_Duraccon.png' },
  { name: 'Howmedica Kinemax', image: '/implant-library/knee_1_Howmedica_Kinemax.png' },
  { name: 'Iduo', image: '/implant-library/knee_1_iduo.png' },
  { name: 'Implantcast PS Fixed Bearing', image: '/implant-library/knee_1_Implantcast_PS_fixed_bearing.jpg' },
  { name: 'Adler Ortho Genus', image: '/implant-library/knee_2_Adler_Ortho_Genus.png' },
  { name: 'Aesculap Columbus', image: '/implant-library/knee_2_Aesculap_Columbus.png' },
  { name: 'Bbraun Emotion', image: '/implant-library/knee_2_Bbarun_Emotion.png' },
  { name: 'Biomet AGC', image: '/implant-library/knee_2_Biomet_AGC.png' },
  { name: 'Biomet Maxim', image: '/implant-library/knee_2_Biomet_Maxim.png' },
  { name: 'Bioimpianti Kmod', image: '/implant-library/knee_2_Bioimpianti_Kmod.png' },
  { name: 'Biolox Delta', image: '/implant-library/knee_2_Biolox_Delta.png' },
  { name: 'Biomet Vanguard', image: '/implant-library/knee_2_Biomet_Vanguard.jpg' },
  { name: 'Corentec Lospo', image: '/implant-library/knee_2_Corentec__Lospo.jpg' },
  { name: 'Depuy AMK', image: '/implant-library/knee_2_Depuy_AMK.jpg' },
  { name: 'Maxx Freedom', image: '/implant-library/knee_2_Maxx_freedom.png' },
  { name: 'Biopro Townley', image: '/implant-library/knee_2_Biopro__Townley.png' },
  { name: 'Microport Evolution', image: '/implant-library/knee_3_Microport_Evolution.png' },
  { name: 'Omni Apex', image: '/implant-library/knee_3_Omni_Apex.png' },
  { name: 'Repcci', image: '/implant-library/knee_3_Repcci.png' },
  { name: 'Smith & Nephew Genesis II', image: '/implant-library/knee_3_Smith_and_Nephew_Genesis_II.png' },
  { name: 'Smith & Nephew Journey II', image: '/implant-library/knee_3_Smith_and_Nephew_Journey_II.jpg' },
  { name: 'Smith & Nephew Legion', image: '/implant-library/knee_3_Smith_and_Nephew_Legion.png' },
  { name: 'Smith & Nephew TC Plus', image: '/implant-library/knee_3_Smith_and_Nephew_TC_plus.png' },
  { name: 'Stryker Scorpio', image: '/implant-library/knee_3_Strykler_Scorpio.jpg' },
  { name: 'Stryker Trihaton', image: '/implant-library/knee_3_Strykler_Trihaton.jpg' },
  { name: 'Zimmer Innex', image: '/implant-library/knee_4_Zimmer_Innex.jpg' },
  { name: 'Zimmer Oxford', image: '/implant-library/knee_4_Zimmer_Oxford.jpg' },
  { name: 'Zimmer Persona', image: '/implant-library/knee_4_Zimmer_Persona.png' },
  { name: 'Corin Uniglide', image: '/implant-library/knee_4_Corin_uniglide.png' },
  { name: 'Wright Medical Advance', image: '/implant-library/knee_4_Wright_Medical_Advance.png' },
  { name: 'DJO Empowr 3D', image: '/implant-library/knee_4_DJO_Empowr_3D.png' },
  { name: 'Exatech Truilent', image: '/implant-library/knee_4_Exatech_Truilent.png' },
  { name: 'Microport Medical Pivot Advance', image: '/implant-library/knee_4_Microport_Medical_Pivot_Advance.png' },
  { name: 'Buchel Pappas', image: '/implant-library/knee_5_Buchel_pappas.png' },
  { name: 'DJO Encore Foundation', image: '/implant-library/knee_5_DJO_Encore_Foundation.png' },
  { name: 'Depuy PFC Sigma', image: '/implant-library/knee_5_Depuy_PFC_Sigma.png' },
  { name: 'Depuy LPS', image: '/implant-library/knee_5_Depuy_LPS.png' },
  { name: 'Depuy Orthogenesis', image: '/implant-library/knee_5_Depuy_Orthogenesis.jpg' },
  { name: 'Howmedica Geometric', image: '/implant-library/knee_5_Howmedica_Geometric.jpg' },
  { name: 'Howmedica Eius', image: '/implant-library/knee_5_Howmedica_Eius.jpg' },
  { name: 'Howmedica Waldius', image: '/implant-library/knee_5_Howmedica_Waldius.png' },
  { name: 'Intermedics Natural Knee', image: '/implant-library/knee_5_Intermedics_Natural_Knee.png' },
  { name: 'Smith & Nephew Anthem', image: '/implant-library/knee_6_SMITH_&_NEPHEW_ANTHEM.jpg' },
  { name: 'Stryker NRG', image: '/implant-library/knee_6_STRYKER_NRG.png' },
  { name: 'Stryker Mako', image: '/implant-library/knee_6_Stryker_Mako.jpg' },
  { name: 'Wright Axiom', image: '/implant-library/knee_6_wright_axiom.jpg' },
  { name: 'Zimmer LPS', image: '/implant-library/knee_6_Zimmer_LPS.jpg' },
  { name: 'Zimmer Biomet LCCK', image: '/implant-library/knee_6_Zimmer_Biomet_LCCK.png' },
  { name: 'Zimmer Biomet OSS', image: '/implant-library/knee_6_ZIMMER_BIOMET_OSS.jpg' },
  { name: 'Zimmer Insall Burstein', image: '/implant-library/knee_7_ZIMMER_Insall_Bursteni.png' },
  { name: 'Kyocera Inita CR', image: '/implant-library/knee_7_Kyocera_Inita_CR.jpg' },
];

const shoulderImplants = [
  { name: 'Accumed Polarus', image: '/implant-library/shoulder_8_Accumed_Polarus.png' },
  { name: 'Arthrex Inverse', image: '/implant-library/shoulder_8_Arthex_Inverse.png' },
  { name: 'Arthrex Universe', image: '/implant-library/shoulder_8_Arthex_Universe.png' },
  { name: 'Biboquet', image: '/implant-library/shoulder_8_Biboquet.png' },
  { name: 'Biomet Bio Angular', image: '/implant-library/shoulder_8_Biomet_Bio_Angular.png' },
  { name: 'Biomet Comprehensive', image: '/implant-library/shoulder_8_Biomet_Comprehensive.png' },
  { name: 'Biomet Verso Reverse', image: '/implant-library/shoulder_8_Biomet_Verso_Reverse.png' },
  { name: 'Copeland', image: '/implant-library/shoulder_8_Copeland.png' },
  { name: 'Depuy Delta', image: '/implant-library/shoulder_8_Depuy_Delta.png' },
  { name: 'Depuy Global Cap', image: '/implant-library/shoulder_8_Depuy_global_cap.png' },
  { name: 'Altivate Reverse', image: '/implant-library/shoulder_8_Altivate_Reverse.png' },
  { name: 'Exatech Equinox', image: '/implant-library/shoulder_9_Exatech_Equinox.png' },
  { name: 'Exatech Interspace', image: '/implant-library/shoulder_9_Exatech_Interspace.png' },
  { name: 'Mathys Affinis Short', image: '/implant-library/shoulder_9_Mathys_Affins_Short.png' },
  { name: 'Biomet Sidus', image: '/implant-library/shoulder_9_Biomet_Sidus.png' },
  { name: 'Smith & Nephew Promos', image: '/implant-library/shoulder_9_Smith_and_Nephew_Promos.png' },
  { name: 'Smith & Nephew Neer', image: '/implant-library/shoulder_9_Smith_and_Nephew_Neer.png' },
  { name: 'Stryker O\'leary', image: '/implant-library/shoulder_9_Stryker_O_leary.png' },
  { name: 'Tornier Simpliciti', image: '/implant-library/shoulder_9_Tornier_Simpliciti.png' },
  { name: 'Lima Corporate SMR', image: '/implant-library/shoulder_9_Lima_Corporate_SMR.png' },
  { name: 'FX Easy Tech', image: '/implant-library/shoulder_10_FX_Easy_Tech.png' },
  { name: 'Tornier Aquelis', image: '/implant-library/shoulder_10_Tornier_Aquelis.png' },
  { name: 'FX Easy Tech Reverse', image: '/implant-library/shoulder_10_FX_Easy_Tech_Reverse.png' },
  { name: 'FH Ortho Arrow', image: '/implant-library/shoulder_10_FH_Ortho_Arrow.png' },
  { name: 'Zimmer Anatomical', image: '/implant-library/shoulder_10_Zimmer_Anatomical.png' },
  { name: 'Zimmer Bigalini', image: '/implant-library/shoulder_10_Zimmer_Bigalini.png' },
  { name: 'Zimmer Cofield', image: '/implant-library/shoulder_10_Zimmer_Cofield.png' },
  { name: 'Zimmer Fenlin', image: '/implant-library/shoulder_10_Zimmer_Fenlin.png' },
  { name: 'Catalyst Ortho', image: '/implant-library/shoulder_10_Catalyst_Ortho.png' },
];

type Category = 'knee' | 'shoulder';

const ImplantLibrary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Category>('knee');
  const [search, setSearch] = useState('');

  const implants = activeTab === 'knee' ? kneeImplants : shoulderImplants;

  const filtered = implants.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Implant Library</h1>
                <p className="text-gray-500 text-sm">Reference images sourced from clinical X-ray database</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <button
              onClick={() => { setActiveTab('knee'); setSearch(''); }}
              className={`px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'knee'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Knee Implants
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'knee' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {kneeImplants.length}
              </span>
            </button>
            <button
              onClick={() => { setActiveTab('shoulder'); setSearch(''); }}
              className={`px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'shoulder'
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Shoulder Implants
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'shoulder' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {shoulderImplants.length}
              </span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search implants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} of {implants.length} implants
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((implant, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={implant.image}
                  alt={implant.name}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Q0EzQUYiIGZvbnQtc2l6ZT0iMTIiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>
              <div className={`px-3 py-2.5 border-t ${activeTab === 'knee' ? 'border-purple-100 bg-purple-50/40' : 'border-pink-100 bg-pink-50/40'}`}>
                <p className={`text-xs font-semibold leading-snug ${activeTab === 'knee' ? 'text-purple-900' : 'text-pink-900'}`}>
                  {implant.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No implants found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImplantLibrary;
