<template>
  <div>
    <Header 
      headline="Portfolio"
      title="Selected work in copywriting and video production"
      description="A collection of projects that showcase our approach to thoughtful communication and authentic storytelling."
    />
    
    <UiContainer class="pb-16 -mt-8">
      <div class="grid lg:grid-cols-8 gap-8 gap-y-4">
        <!-- Row 1: Restaurant Campaign -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Restaurant interior' },
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Food preparation' },
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Finished dish' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Local Restaurant Campaign</template>
            <template #content>We believe the best meals happen when quality ingredients meet quiet confidence. No trends. No noise. Just honest food that speaks for itself.</template>
          </SideCard>
        </div>

        <!-- Row 2: Artisan Workshop -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Workshop tools' },
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Craftsmanship detail' },
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Finished product' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Artisan Workshop Brand</template>
            <template #content>Every piece tells a story of patience and skill. In a world of fast everything, we choose slow. We choose thoughtful. We choose lasting.</template>
          </SideCard>
        </div>

        <!-- Row 3: Consulting Services -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Team meeting' },
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Strategy session' },
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Results presentation' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Consulting Services Website</template>
            <template #content>We help businesses find clarity in complexity. Clear thinking. Clear communication. Clear results. Because the best solutions are often the simplest ones.</template>
          </SideCard>
        </div>

        <!-- Row 4: Nonprofit Campaign -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Community event' },
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Volunteer work' },
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Impact story' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Community Nonprofit Initiative</template>
            <template #content>Real change happens quietly, one person at a time. We helped tell the story of grassroots impact, focusing on genuine connection over grand gestures.</template>
          </SideCard>
        </div>

        <!-- Row 5: Local Cafe Branding -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Coffee preparation' },
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Cafe atmosphere' },
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Customer moment' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Corner Cafe Rebrand</template>
            <template #content>A neighborhood gathering place deserves words that feel like home. Simple menus, honest descriptions, and copy that invites rather than sells.</template>
          </SideCard>
        </div>

        <!-- Row 6: Professional Services Firm -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Professional meeting' },
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Office environment' },
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Client consultation' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Legal Practice Messaging</template>
            <template #content>Complex expertise, simple communication. We helped translate legal knowledge into language that puts clients at ease and builds trust through clarity.</template>
          </SideCard>
        </div>

        <!-- Row 7: Wellness Studio -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Wellness space' },
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Treatment room' },
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Peaceful moment' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Holistic Wellness Center</template>
            <template #content>Healing happens in spaces that honor both body and spirit. Our words created an atmosphere of calm confidence, inviting clients into genuine self-care.</template>
          </SideCard>
        </div>

        <!-- Row 8: Independent Bookstore -->
        <div class="lg:col-span-5">
          <PortfolioItem
            :images="[
              { src: '/images/8bfedd83aec8466a4708d60ec299d164.jpg', alt: 'Book shelves' },
              { src: '/images/90d52ee25f93c3e7deaf019956a6089b.jpg', alt: 'Reading corner' },
              { src: '/images/3334f4a0741954580a818e303927dfcd.jpg', alt: 'Literary event' }
            ]"
          />
        </div>
        <div class="lg:col-span-3 flex items-start">
          <SideCard>
            <template #title>Independent Bookstore Revival</template>
            <template #content>In the age of algorithms, we celebrated the human touch of book curation. Copy that honored the ritual of discovery and the irreplaceable value of browsing.</template>
          </SideCard>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup>
</script>