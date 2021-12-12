<template>
  <div>
    <Spinner color="white" v-if="$fetchState.pending"></Spinner>
    <v-carousel
      :height="carouselHeight"
      :prev-icon="false"
      :next-icon="false"
      :interval="3000"
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      class="mt-0 mb-9 carousel"
    >
      <v-carousel-item
        v-for="item in items"
        :key="item.id"
        eager
        class="carousel-item"
      >
        <div class="img-overlay"></div>
        <v-img
          @load="handleLoad()"
          :src="item['Event Image']"
          :to="`/event/${item._id}`"
          nuxt
          class="carousel-img"
          id="carousel-img"
          eager
        >
          <v-container class="fill-height pa-0 ma-0 pb-0 carousel-inner" fluid>
            <v-row class="fill-height pb-0 mb-0 carousel-row" align="center">
              <v-col class="carousel-col" cols="12">
                <div v-show="imageLoaded" class="pa-0 carousel-div">
                  <div class="carousel-top">
                    <h2 v-text="item.Title" style="white-space: pre-line" />
                  </div>
                  <div class="carousel-bottom">
                    <h3
                      v-text="`${item.Description.substr(0, 80)}...`"
                      style="white-space: pre-line"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <!-- <v-container v-else class="cards">
      <EventCard
        v-for="event of events"
        :key="event.id"
        :event="event"
        @register="handleRegistration"
      >
        <v-btn @click.stop="handleRegistration(event._id)"
          >Register</v-btn
        ></EventCard
      >
    </v-container> -->
        <v-card-text
        class="pt-10 pb-10 px-6 white--text"
        v-show="imageLoaded"
        style="font-size: 22px; font-weight: bold; text-align:center"
      >
        Explore
      </v-card-text>
    <v-container class="event-container">
      <v-row
        align="center"
        class="justify-center justify-md-start event-container-row"
      >
        <v-col
          v-for="event in events"
          :key="event.id"
          :event="event"
          @register="handleRegistration"
          class="xs event-container-col"
          cols="12"
          xl="3"
          lg="4"
          md="6"
          sm="9"
        >
          <v-card
            :to="`/event/${event._id}`"
            nuxt
            class="pa-0 pb-3 event-card"
            hover
          >
            <div v-if="!!event['Event Image']" class="pt-0 event-card-inner">
              <img
                :src="event['Event Image']"
                alt="event Post Image"
                class="event-card-img"
                onerror="/img/image-not-found.png"
              />
            </div>
            <div v-else class="pt-0 event-card-inner">
              <img
                class="event-card-img"
                alt="Image Not Found Image"
                src="/img/image-not-found.png"
              />
            </div>
            <v-card-text
              v-if="event.Title && event.Title !== ''"
              class="font-weight-bold jgreyest--text card-title"
            >
              {{ event.Title }}
            </v-card-text>
            <v-card-text
              v-if="
                  event.Location !== '' && event['Is Online'] === 'No'
              "
              class="pt-2 pb-1 px-6 jblackest--text"
              style="font-size: 16px; font-weight: bold;"
            >
              <v-icon color="jblackest" size="18">mdi-map-marker</v-icon>
              <!-- <span class="font-weight-bold">
                Location:
              </span> -->
              <span
                class="mt-1"
              >
                {{
                  event.Location
                }}
              </span>

            </v-card-text>
            <v-card-text
              v-if="
                  event.Location !== '' && event['Is Online'] === 'Yes'
              "
              class="pt-2 pb-1 px-6 jblackest--text"
              style="font-size: 16px; font-weight: bold;"
            >
              <!-- <v-icon color="jblackest" size="18">mdi-map-marker</v-icon> -->
              <!-- <span class="font-weight-bold">
                Location:
              </span> -->
              <span
                v-if="
                  event['Is Online'] === 'Yes'
                "
                class="mt-1"
              >
                Online
              </span>

            </v-card-text>
            <v-card-text
              v-if="event.Description"
              class="pt-2 pb-1 px-6 jgreyest--text"
              style="font-size: 16px; font-weight: bold"
            >
              <span class="mt-1">
                {{ `${event.Description.substr(0, 80)}...` }}
              </span>
            </v-card-text>
            <v-card-text
              v-if="event['Event Date (from)']"
              class="pt-2 pb-1 px-6 info--text"
              style="font-size: 16px; font-weight: bold"
            >
              <span class="mt-1">
                {{
                  event["Event Date (from)"]
                    .substr(0, event["Event Date (from)"].indexOf("T"))
                    .split("-")
                    .join(".")
                }}
              </span>
            </v-card-text>
            <v-card-text>
              <v-chip class="teal tag" v-for="tag of event.Tag" :key="tag"
                ><p>{{ tag }}</p></v-chip
              >
            </v-card-text>
            <div class="pa-4">
              <v-card-text
                class="jpurple white--text text-center text-20 card-details"
              >
                See Details
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    carouselHeight() {
      return "";
    },

    items() {
      let random;
      let len = this.events.length;

      if (this.events.length > 12) {
        random = this.rng(0, len - 6);
        let count = 0;
        let selected = [];
        this.events.slice(random, len - 1).forEach((e) => {
          if (e["Event Image"] && e["Event Image"] !== "" && count <= 5) {
            selected.push(e);
          }
          count += 1;
        });
        console.log("selected", selected);
        return selected;
      } else if (this.events.length > 0) {
        random = this.rng(0, this.events.length - 1);
        let count = 0;
        let selected = [];
        this.events.forEach((e) => {
          if (e["Event Image"] && e["Event Image"] !== "" && count <= 5) {
            selected.push(e);
          }
          count += 1;
        });
        console.log("selected", selected);
        return selected;
      } else {
        return null;
      }
    },
    currentUser() {

      return this.$auth.$storage.getUniversal('user')
    },
  },

  data() {
    return {
      imageCount: 0,
      imageLoaded: false,
      events: [],
    };
  },
  async fetch() {
    // console.log("here here here")
    // console.log(this.$auth.$storage.getUniversal('loggedIn'));
    if(!this.$auth.$storage.getUniversal('loggedIn')) {
      this.$router.push({path: '/login'});
      return
    }
    const eventsRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/event"
    );
    console.log("current user id", this.currentUser.user_id);
    const entriesRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/entry",
      {
        params: {
          constraints: {
            key: "user_id",
            constraint_type: "equals",
            value: this.currentUser.user_id,
          },
        },
      }
    );
    console.log("entriesRes", entriesRes);
    const events = eventsRes.response.results;
    const entries = entriesRes.response.results;
    const unregisteredEvents = events.filter((event) => {
      const isRegistered = entries.find((entry) => entry.event_id == event._id)
        ? true
        : false; // Find return truthy value if item is in array and falsy otherwise
      return !isRegistered;
    });
    const userRes = await this.$axios.$get(
      `https://t2meet.bubbleapps.io/version-test/api/1.1/obj/user/${this.currentUser.user_id}`
    );
    const userTagIds = userRes.response.Tags;

    const allTagsRes = await this.$axios.$get(
      "https://t2meet.bubbleapps.io/version-test/api/1.1/obj/tag_data"
    );

    const allTags = allTagsRes.response.results;

    const userTags = allTags
      .filter((tag) => {
        return userTagIds.find((userTagId) => userTagId === tag._id);
      })
      .map((tag) => tag.Name.toLowerCase());
    console.log(userTags);

    const sortedEvents = unregisteredEvents.sort((a, b) => {
      const aMatch = a.Tag.filter((value) =>
        userTags.includes(value.toLowerCase())
      );
      const bMatch = b.Tag.filter((value) =>
        userTags.includes(value.toLowerCase())
      );
      if (aMatch.length > bMatch.length) {
        return -1;
      } else if (aMatch.length < bMatch.length) {
        return 1;
      } else {
        return 0;
      }
    });

    this.events = sortedEvents;
    console.log(sortedEvents);
  },
  fetchOnServer: false,
  fetchKey: "events",
  methods: {
    handleLoad() {
      this.imageCount += 1;
      if (this.imageCount >= 1) {
        this.imageLoaded = true;
      }
    },
    rng(min, max) {
      return Math.random() * (max - min) + min;
    },
    async handleRegistration(eventId) {
      this.isRegistering = true;
      console.log(eventId);
      await this.$axios.$post(
        "https://t2meet.bubbleapps.io/version-test/api/1.1/wf/register-event",
        {},
        {
          params: {
            eventId: eventId,
            userId: this.currentUser.user_id,
          },
        }
      );
      this.$fetch();
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  text-align: center;
  margin-right: 1rem;
  margin-top: 0.5rem;
  p {
    margin-bottom: 0;
  }
}
/* .cards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  flex-wrap: wrap;
  align-content: space-between;
}
.cards * {
  text-decoration: none;
  margin-top: 10px;
} */
</style>

<style lang="scss" scoped>
@import "~/assets/scss/global.scss";
.index-container {
  margin-bottom: 40px;
}
.event-container {
  .event-container-row {
    .event-container-col {
      .event-card {
        border-radius: 5px;
        .event-card-inner {
          height: 290px;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
          @media screen and (max-width: 959px) {
            height: 56vw;
          }
          @media screen and (max-width: 599px) {
            height: 75vw;
          }
          .event-card-img {
            width: auto;
            height: 290px;
            @media screen and (max-width: 959px) {
              height: 56vw;
            }
            @media screen and (max-width: 599px) {
              height: 75vw;
            }
            object-fit: cover;
            border-radius: 5px 5px 0 0;
          }
        }
      }
    }
  }
}
.card-title {
  font-size: 26px;
  line-height: 1.8rem;
  padding: 8px 24px 4px;
  @media screen and (max-width: $sp-max-width) {
    font-size: 20px;
    line-height: 1.5rem;
    padding-top: 4px;
  }
}
.card-details {
  font-size: 20px;
  @media screen and (max-width: $sp-max-width) {
    font-size: 16px;
  }
}
.carousel {
  height: 33vw;
  background-color: rgb(0,0,0);
  // box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 1920px) {
    height: 580px !important;
  }
  @media screen and (max-width: 1600px) {
    height: 480px !important;
  }
  @media screen and (max-width: 1000px) {
    height: 380px !important;
  }
  @media screen and (max-width: $sp-max-width) {
    height: 320px !important;
  }
  .carousel-item {
    height: 33vw;
    position: relative;
    width: 100%;
    font-size: 0;
    @media screen and (max-width: 1920px) {
      height: 580px !important;
    }
    @media screen and (max-width: 1600px) {
      height: 480px !important;
    }
    @media screen and (max-width: 1000px) {
      height: 380px !important;
    }
    @media screen and (max-width: $sp-max-width) {
      height: 320px !important;
    }
    .img-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(128, 128, 128, 0.75);
    }
    #carousel-img {
      filter: brightness(90%);
    }
    .carousel-img {
      object-fit: cover;
      height: 33vw;
      @media screen and (max-width: 1920px) {
        height: 580px !important;
      }
      @media screen and (max-width: 1600px) {
        height: 480px !important;
      }
      @media screen and (max-width: 1000px) {
        height: 380px !important;
      }
      @media screen and (max-width: $sp-max-width) {
        height: 320px !important;
      }
      .carousel-inner {
        .carousel-row {
          .carousel-col {
            .carousel-div {
              background-color: rgba(255,255,255,0.8);
              max-width: 946px;
              margin-left: 113px;
              margin-bottom: 80px;
              // z-index: 600;
              @media screen and (max-width: 1800px) {
                margin-left: 90px;
                max-width: 860px;
              }
              @media screen and (max-width: 1600px) {
                margin-left: 80px;
                max-width: 740px;
              }
              @media screen and (max-width: 1300px) {
                margin-left: 50px;
                max-width: 600px;
                margin-top: 30px;
                margin-bottom: 0;
              }
              @media screen and (max-width: 1000px) {
                margin-left: 20px;
                max-width: 500px;
              }
              @media screen and (max-width: 800px) {
                margin-left: 15px;
                max-width: 420px;
              }
              @media screen and (max-width: $sp-max-width) {
                margin: 0 20px;
                max-width: 380px;
                padding: 0;
              }
              @media screen and (max-width: 450px) {
                margin: 0 20px;
                padding: 0;
                margin-top: 80px;
              }
              .carousel-top {
                padding: 10px;
                margin-bottom: 25px;
                padding-bottom: 0;
                @media screen and (max-width: 1300px) {
                  margin-bottom: 16px;
                }
                @media screen and (max-width: $sp-max-width) {
                  max-width: 300px;
                }
                h2 {
                  margin: 0 0 12px;
                  object-fit: contain;
                  -webkit-text-stroke: 1px rgba(0, 0, 0, 0);
                  // font-family: 'Source Sans Pro';
                  font-size: 50px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: 1.2;
                  letter-spacing: normal;
                  text-align: left;
                  color: $jblue;
                  @media screen and (max-width: 1800px) {
                    font-size: 45px;
                  }
                  @media screen and (max-width: 1600px) {
                    font-size: 38px;
                  }
                  @media screen and (max-width: 1300px) {
                    font-size: 34px;
                  }
                  @media screen and (max-width: 1000px) {
                    font-size: 30px;
                  }
                  @media screen and (max-width: 800px) {
                    font-size: 28px;
                  }
                  @media screen and (max-width: $sp-max-width) {
                    font-size: 24px;
                  }
                  @media screen and (max-width: 400px) {
                    font-size: 22px;
                  }
                }
              }
              .carousel-bottom {
                padding: 10px;
                padding-top: 0;
                h3 {
                  margin: 12px 0px 0 0;
                  object-fit: contain;
                  -webkit-text-stroke: 1px rgba(0, 0, 0, 0);
                  // font-family: 'Source Sans Pro';
                  font-size: 30px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: 1.33;
                  letter-spacing: normal;
                  text-align: left;
                  color: #4b4b4b;
                  @media screen and (max-width: 1800px) {
                    font-size: 28px;
                  }
                  @media screen and (max-width: 1600px) {
                    font-size: 26px;
                  }
                  @media screen and (max-width: 1300px) {
                    font-size: 24px;
                  }
                  @media screen and (max-width: 1000px) {
                    font-size: 22px;
                  }
                  @media screen and (max-width: 800px) {
                    font-size: 20px;
                  }
                  @media screen and (max-width: $sp-max-width) {
                    font-size: 18px;
                  }
                  @media screen and (max-width: 400px) {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .carousel-item:last-child {
    .carousel-img {
      .carousel-inner {
        .carousel-row {
          .carousel-col {
            .carousel-div {
              @media screen and (max-width: 1000px) {
                margin: 0 20px;
                padding: 0;
                margin-top: 0px;
                margin-bottom: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
