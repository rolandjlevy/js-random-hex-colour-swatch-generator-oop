const $ = (elem) => document.querySelector(elem);

const MAX_HEX = parseInt('ff', 16);
let swatchCount = 0;
let selected = null;

const newColour = () => {
  if (selected) {
    selected.classList.remove('active');
  }
  const colour = new Colour(MAX_HEX);
  loadSwatch(colour);
  addSwatch(colour);
}

const loadSwatch = (colour) => {
  $('.block').style.backgroundColor = `#${colour.hex}`;
  $('.hex-value').textContent = `#${colour.hex}`;
  $('.hex-value').href = `https://www.colorhexa.com/${colour.hex}`;
  $('.block-overlay').innerHTML = `
    <h4 class="m-0 m-b-5">Colour information <i class="fas fa-info-circle"></i></h4> 
    <p class="font-size-14px m-0">
      Hex: #${colour.hex}<br>
      RGB: ${colour.rgb}<br>
      HSL: ${colour.hsl}<br>
    </p>
  `;
}

const addSwatch = (colour) => {
  const clone = $('.swatch').cloneNode(true);
  clone.id = String(++swatchCount);
  clone.value = JSON.stringify(colour);
  clone.classList.add('swatch');
  Object.assign(clone.style, {
    backgroundColor: `#${colour.hex}`,
    display: 'inline-block',
  });
  clone.addEventListener('click', (e) => {
    selectSwatch(e);
    const colourObject = JSON.parse(e.target.value);
    loadSwatch(colourObject);
  });
  $('.swatch').before(clone);
  $('.swatchWrapper').scrollTop = $('.swatchWrapper').scrollHeight;
  if ($('.swatchWrapper').scrollTop > 0) {
    $('.swatchWrapper').classList.add('overflow-y-scroll');
  }
}

const selectSwatch = (e) => {
  if (selected) {
    selected.classList.remove('active');
  }
  e.target.classList.add('active');
  selected = e.target;
}

$('.btn').addEventListener('click', () => newColour());

document.addEventListener('DOMContentLoaded', (e) => {
  $('.this-year').textContent = new Date().getFullYear();
  newColour();
});