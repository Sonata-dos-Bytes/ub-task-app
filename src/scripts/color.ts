export function getRandomColor() {
  const colors = [
    "#FF5733", // vermelho alaranjado
    "#33FF57", // verde limão
    "#3357FF", // azul royal
    "#F1C40F", // amarelo
    "#8E44AD", // roxo
    "#1ABC9C", // turquesa
    "#E74C3C", // vermelho
    "#2ECC71", // verde
    "#3498DB", // azul
    "#F39C12", // laranja
    "#9B59B6", // lavanda
    "#34495E", // azul escuro
    "#16A085", // verde escuro
    "#D35400", // laranja queimado
    "#7F8C8D", // cinza
    "#FF1493", // rosa profundo
    "#00FFFF", // ciano
    "#FF6347", // tomate
    "#FFD700", // dourado
    "#008080", // verde-azulado
    "#663399", // azul violeta
    "#FF4500", // laranja avermelhado
    "#2F4F4F", // cinza escuro
    "#A52A2A", // marrom
    "#800080", // roxo escuro
    "#DC143C", // carmesim
    "#7FFF00", // verde chartreuse
    "#D2691E", // chocolate
    "#FF8C00", // laranja escuro
    "#4B0082", // índigo
    "#B22222", // vermelho fogo
    "#FF00FF", // magenta
    "#6A5ACD", // azul ardósia
    "#8A2BE2", // azul violeta
    "#C71585", // violeta médio
    "#FF8C00", // laranja escuro
  ]

  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
