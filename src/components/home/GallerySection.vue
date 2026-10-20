<template>
  <!--------------------------------------------------------------------- GREYSCALE GALLERY SECTION -------------------------------------------------->
  <section class="q-px-md q-md-px-0">
    <div class="constrain">
      <div class="gallery-grid">
        <div
          v-for="(img, i) in gallery"
          :key="i"
          class="gallery-tile"
          :class="`gallery-tile--${i + 1}`"
        >
          <img :src="img" class="gallery-image" alt="" />
        </div>
      </div>

      <!-- CTA -->
      <div class="row justify-center q-mt-xl">
        <q-btn
          dense
          no-caps
          label="Learn More"
          color="grey-7"
          text-color="light"
          class="gallery-cta q-px-xl q-py-sm text-subtitle1 text-bold"
        />
      </div>
    </div>

    <div class="section-spacer-lg"></div>
  </section>
</template>

<script>
export default {
  name: "GallerySection",
  data() {
    return {
      gallery: [
        new URL("src/assets/gallery/persons/g6.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g2.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g3.png", import.meta.url).href,
        new URL("src/assets/gallery/persons/g4.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g1.jpg", import.meta.url).href,
        new URL("src/assets/gallery/persons/g5.jpg", import.meta.url).href,
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.gallery-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 32px
  margin: 0 auto

  @media (max-width: 1023px)
    gap: 20px

  @media (max-width: 600px)
    grid-template-columns: repeat(2, 1fr)
    gap: 16px

.gallery-tile
  position: relative
  aspect-ratio: 1
  border-radius: 24px
  overflow: hidden
  background: #0a0a0a
  isolation: isolate

  @media (max-width: 600px)
    border-radius: 16px

.gallery-image
  width: 100%
  height: 100%
  object-fit: cover
  object-position: var(--pos, 50% 50%)
  transform: scale(var(--zoom, 1))
  scale: 1
  filter: grayscale(100%) contrast(1.05) brightness(0.95)
  transition: filter 0.4s ease, scale 0.6s cubic-bezier(0.22, 1, 0.36, 1)
  will-change: scale

  .gallery-tile:hover &
    scale: 1.12
    filter: grayscale(0%) contrast(1) brightness(1)

.gallery-tile--1 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--2 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--3 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--4 .gallery-image
  --pos: 50% 50%
  --zoom: 1

.gallery-tile--5 .gallery-image
  --pos: 60% 50%
  --zoom: 1.25

.gallery-tile--6 .gallery-image
  --pos: 50% 35%
  --zoom: 1.03

.gallery-cta
  border-radius: 0 !important
  border: 1px solid rgba(255, 255, 255, 0.6) !important
  background: transparent !important
  letter-spacing: 0.15em
  text-transform: uppercase
  font-size: 0.85rem
  transition: background-color 0.25s ease, border-color 0.25s ease

  &:hover
    background: rgba(255, 255, 255, 0.08) !important
    border-color: rgba(255, 255, 255, 0.9) !important
</style>
