import { shallowMount } from "@vue/test-utils";
import TheNav from "../../src/components/TheNav";
import router from "@/router";
import store from "@/store/index";

describe("TheNav", () => {
  const wrapper = shallowMount(TheNav, { store, router });

  it("has login/register nav link initially", () => {
    const navItems = wrapper.findAll(".nav-item");
    expect(navItems.length).toBe(3);
  });

  it("has username in last nav-link after login", async () => {
    await wrapper.vm.$store.dispatch("users/loginUser", {
      email: "ankit1234@gmail.com",
      password: "ankit1234"
    });
    const navItems = wrapper.findAll(".nav-item");
    const username = navItems.at(navItems.length - 1).text();
    expect(username).toBe("ankit1234");
  });
});
