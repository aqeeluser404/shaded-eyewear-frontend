<template>
  <!--------------------------------------------------------------------- SERVICES SECTION -------------------------------------------------->
  <section
    class="q-px-md q-md-px-0 bg-dark"
    style="border-top: 1px solid rgba(255, 255, 255, 0.2)"
  >
    <div class="section-spacer-lg"></div>

    <div class="constrain" id="service-section">
      <div
        class="font-size-responsive-giant archivo text-light text-bold q-mb-md"
        style="line-height: 1.2"
      >
        OUR <span class="text-gradient-primary">SERVICES</span>
      </div>
      <div
        class="statement-label font-size-responsive-sm text-gradient-primary"
      >
        WHAT YOU GET WITH EVERY ORDER
      </div>

      <div class="section-spacer-sm"></div>

      <div class="services-grid">
        <div v-for="s in services" :key="s.title" class="service-cell">
          <div class="service-icon q-mb-lg">
            <q-icon :name="s.icon" size="22px" />
          </div>

          <div class="font-size-responsive-md archivo text-light q-mb-sm">
            {{ s.title }}
          </div>
          <div class="font-size-responsive-sm text-dimmed service-text">
            {{ s.text }}
          </div>
        </div>
      </div>
    </div>

    <div class="section-spacer-lg"></div>
  </section>
</template>

<script>
export default {
  name: "ServicesSection",
  data() {
    return {
      services: [
        {
          icon: "fa-solid fa-credit-card",
          title: "PAID WITH YOCO",
          text: "Card, EFT and instant payments, secured end to end at checkout.",
        },
        {
          icon: "fa-solid fa-truck-fast",
          title: "FAST AND RELIABLE",
          text: "Cape Town deliveries within two working days, tracked all the way.",
        },
        {
          icon: "fa-solid fa-store",
          title: "DOORSTEP PICKUP",
          text: "Collect at 65 Stockley Road, Kenwyn - open weekdays 08:00 to 17:00.",
        },
        {
          icon: "fa-solid fa-shield-halved",
          title: "2 YEAR WARRANTY",
          text: "Every frame is covered for two years against defects in materials and craftsmanship.",
        },
        {
          icon: "fa-solid fa-rotate-left",
          title: "EASY RETURNS",
          text: "Not the right fit? Return within 14 days for a full refund - no questions asked.",
        },
        {
          icon: "fa-solid fa-headset",
          title: "DIRECT SUPPORT",
          text: "Questions about fit, tint or warranty? Message us - a real person replies, usually within a day.",
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.statement-label
  letter-spacing: 0.2em

.services-grid
  display: grid
  grid-template-columns: 1fr
  gap: 24px

  @media (min-width: 600px)
    grid-template-columns: repeat(2, 1fr)

  @media (min-width: 1024px)
    grid-template-columns: repeat(3, 1fr)

.service-cell
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  padding: 40px 32px
  background-color: rgba(255, 255, 255, 0.03)
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 16px
  overflow: hidden
  transition: border-color 0.3s ease, transform 0.3s ease, background-color 0.3s ease

  &:hover
    border-color: color-mix(in srgb, var(--q-primary) 60%, transparent)
    background-color: rgba(255, 255, 255, 0.05)
    transform: translateY(-4px)

    .service-icon
      transform: translateY(-2px)
      border-color: color-mix(in srgb, var(--q-primary) 55%, transparent)

.service-icon
  position: relative
  z-index: 1
  width: 56px
  height: 56px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  color: var(--q-primary)
  border: 1px solid rgba(255, 255, 255, 0.12)
  transition: transform 0.3s ease, border-color 0.3s ease

.service-text
  max-width: 300px
  line-height: 1.6
</style>
