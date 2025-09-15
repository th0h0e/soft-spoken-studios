<template>
  <UiTimeline v-model="currentStep" class="w-full">
    <UiTimelineItem :step="1">
      <UiTimelineIndicator />
      <UiTimelineContent>
        <UiTimelineHeader>
          <UiTimelineTitle>High School Diploma</UiTimelineTitle>
          <UiTimelineDate>2014 - 2018</UiTimelineDate>
        </UiTimelineHeader>
        <div class="mt-2">
          <p class="text-sm text-muted-foreground mb-3">
            Central High School. Graduated with honors, focusing on English Literature and Visual Arts. 
            Active in the school newspaper and photography club.
          </p>
        </div>
      </UiTimelineContent>
      <UiTimelineSeparator />
    </UiTimelineItem>

    <UiTimelineItem :step="2">
      <UiTimelineIndicator />
      <UiTimelineContent>
        <UiTimelineHeader>
          <UiTimelineTitle>Bachelor of Arts in Communications</UiTimelineTitle>
          <UiTimelineDate>2018 - 2022</UiTimelineDate>
        </UiTimelineHeader>
        <div class="mt-2">
          <p class="text-sm text-muted-foreground mb-3">
            University of Creative Arts. Specialized in Digital Media and Strategic Communications. 
            Graduated Magna Cum Laude. Completed internships at local creative agencies and media companies.
          </p>
        </div>
      </UiTimelineContent>
      <UiTimelineSeparator />
    </UiTimelineItem>

    <UiTimelineItem :step="3">
      <UiTimelineIndicator />
      <UiTimelineContent>
        <UiTimelineHeader>
          <UiTimelineTitle>Digital Marketing Certificate</UiTimelineTitle>
          <UiTimelineDate>2022</UiTimelineDate>
        </UiTimelineHeader>
        <div class="mt-2">
          <p class="text-sm text-muted-foreground mb-3">
            Google Digital Marketing Academy. Comprehensive program covering data-driven marketing, 
            analytics, and digital strategy. Focus on measurable campaign optimization and ROI analysis.
          </p>
        </div>
      </UiTimelineContent>
      <UiTimelineSeparator />
    </UiTimelineItem>

    <UiTimelineItem :step="4">
      <UiTimelineIndicator />
      <UiTimelineContent>
        <UiTimelineHeader>
          <UiTimelineTitle>Photography & Videography Certification</UiTimelineTitle>
          <UiTimelineDate>2023</UiTimelineDate>
        </UiTimelineHeader>
        <div class="mt-2">
          <p class="text-sm text-muted-foreground mb-3">
            Creative Media Institute. Advanced techniques in visual storytelling and production. 
            Mastered both technical skills and creative direction for commercial and artistic projects.
          </p>
        </div>
      </UiTimelineContent>
    </UiTimelineItem>
  </UiTimeline>
</template>

<script setup>
const currentStep = ref(1);
</script>