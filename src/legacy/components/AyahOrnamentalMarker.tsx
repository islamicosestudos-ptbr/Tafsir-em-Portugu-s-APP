import React from "react";

interface AyahOrnamentalMarkerProps {
  ayahNumber: number;
  isDark?: boolean;
  isHighContrast?: boolean;
  className?: string;
}

/**
 * Marcador ornamental tradicional dos versículos do Alcorão (Mushaf al-Madinah).
 *
 * Utiliza geometria vetorial SVG com sistema de coordenadas unificado para garantir que
 * o número do versículo permaneça 100% centralizado horizontal e verticalmente em:
 *  - Todas as opções de fontes árabes (Amiri Quran, Amiri, Scheherazade New, Noto Naskh);
 *  - Qualquer tamanho de fonte selecionado pelo leitor (22px a 56px);
 *  - Qualquer altura de linha (1.8 a 3.2);
 *  - Qualquer quantidade de algarismos (1, 2 ou 3 dígitos, ex.: 1, 45, 286);
 *  - Todos os tamanhos de tela e temas visuais (Claro, Escuro, Alto Contraste).
 */
export const AyahOrnamentalMarker: React.FC<AyahOrnamentalMarkerProps> = ({
  ayahNumber,
  isDark = false,
  isHighContrast = false,
  className = "",
}) => {
  const numStr = String(ayahNumber);

  // Paleta de cores fiéis ao estilo dourado/âmbar tradicional dos Mushafs
  const strokeColor = isHighContrast ? "#fde047" : isDark ? "#fbbf24" : "#b45309";

  const numColor = isHighContrast ? "#fde047" : isDark ? "#fef3c7" : "#78350f";

  // Dimensionamento proporcional para 1, 2 ou 3 dígitos mantendo margem segura
  const fontSize = numStr.length >= 3 ? "10.5" : numStr.length === 2 ? "12.5" : "14.5";

  const letterSpacing = numStr.length >= 3 ? "-0.4px" : "normal";

  return (
    <span
      role="img"
      aria-label={`Versículo ${ayahNumber}`}
      className={`inline-block select-none align-middle mx-1.5 ${className}`}
      style={{
        display: "inline-block",
        verticalAlign: "-0.2em",
        lineHeight: 1,
        width: "1.38em",
        height: "1.38em",
      }}
    >
      <svg
        viewBox="0 0 36 36"
        width="100%"
        height="100%"
        className="overflow-visible"
        style={{ display: "block" }}
      >
        {/* Fundo suave com brilho dourado translúcido */}
        <circle
          cx="18"
          cy="18"
          r="15.8"
          fill={strokeColor}
          fillOpacity={isHighContrast ? "0.18" : isDark ? "0.14" : "0.06"}
        />

        {/* Roseta ornamental externa (8 pétalas tradicionais com arcos suaves) */}
        <path
          d="M 18.00 2.00 Q 21.22 1.82 23.43 4.88 Q 25.78 6.36 29.31 6.69 Q 31.72 8.83 31.12 12.57 Q 31.73 15.27 34.00 18.00 Q 34.18 21.22 31.12 23.43 Q 29.64 25.78 29.31 29.31 Q 27.17 31.72 23.43 31.12 Q 20.73 31.73 18.00 34.00 Q 14.78 34.18 12.57 31.12 Q 10.22 29.64 6.69 29.31 Q 4.28 27.17 4.88 23.43 Q 4.27 20.73 2.00 18.00 Q 1.82 14.78 4.88 12.57 Q 6.36 10.22 6.69 6.69 Q 8.83 4.28 12.57 4.88 Q 15.27 4.27 18.00 2.00 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Aro ornamental interno fino */}
        <circle
          cx="18"
          cy="18"
          r="12.2"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.9"
          strokeOpacity="0.85"
        />

        {/* 8 Pontos cardeais e diagonais ornamentais */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 18 + 14.1 * Math.cos(rad);
          const y = 18 + 14.1 * Math.sin(rad);
          return (
            <circle key={angle} cx={x.toFixed(2)} cy={y.toFixed(2)} r="0.85" fill={strokeColor} />
          );
        })}

        {/* Número do versículo milimetricamente centralizado em (18, 18) */}
        <text
          x="18"
          y="18"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="central"
          fill={numColor}
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif"
          letterSpacing={letterSpacing}
          style={{
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {ayahNumber}
        </text>
      </svg>
    </span>
  );
};
