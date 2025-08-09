<template>
    <div class="bg-[#F5F7FA] p-6">
        <h1 class="font-inter font-medium text-[24px] leading-[32px] tracking-[-0.015em] text-[#0E121B] mb-2">
            WhatsApp Analytics
        </h1>
        <p class="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-[#525866]">
            Monitor your chatbot performance and message usage
        </p>



        <div class="w-full h-[84px] rounded-[10px] bg-[#e0f2ec] relative overflow-hidden mt-[30px]">
            <div class=" absolute top-0 left-0 w-[10px] h-full bg-[#1FC16B]"></div>
            <div class="flex justify-between items-center px-[22px] h-full">
                <div class="flex space-x-2 items-start">
                    <img src="/icons/WhatsApp/shield.svg" alt="" class="mt-1">
                    <div class=" space-y-2">
                        <p class="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.011em] text-[#0E121B]">
                            Daily Message Usage: 100 / 250 messages
                        </p>
                        <p class="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.006em] text-[#525866]">
                            150 messages remaining • Resets in 24:00
                        </p>
                    </div>


                </div>
                <div class="inline-flex px-[8px] py-[4px] rounded-full space-x-1 items-center bg-[#1FC16B]"> <img
                        src="/icons/WhatsApp/turbo.svg" alt="" class="">
                    <p class="font-inter font-medium text-[12px] leading-[16px] tracking-[0em] text-white">Good - Normal
                        Usage</p>
                </div>
            </div>
        </div>
        <!-- Analytics Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[24px]">
            <!-- Incoming Messages Card -->
            <div
                class="w-full rounded-[12px] border border-[#E1E4EA] p-[24px] gap-[20px] bg-[#FFFFFF] justify-between flex flex-col">
                <div class="flex items-center space-x-2.5">
                    <div
                        class="w-[40px] h-[40px] rounded-full border-2 border-[#E1E4EA] bg-[#F5F7FA] flex items-center justify-center">
                        <img src="/chart/incoming.svg" alt="" class="w-[9.17px] h-auto">
                    </div>
                    <p class="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.011em] text-[#0E121B]">
                        Incoming Messages</p>
                </div>
                <div class="">
                    <h1
                        class="font-inter font-medium text-[24px] leading-[32px] tracking-[-0.015em] text-[#0E121B] mb-1.5">
                        150
                    </h1>
                    <div class="flex items-center space-x-1.5">
                        <img src="/chart/arrow-up.svg" alt="">
                        <span
                            class="font-sans font-medium text-sm leading-5 tracking-[0em] text-center text-[#1FC16B]">+12</span>
                        <p class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-[#525866]">
                            from yesterday
                        </p>
                    </div>
                </div>
                <div class="mb-4"><img src="/chart/1.png" alt=""></div>
            </div>

            <!-- Outgoing Messages Card -->
            <div
                class="w-full rounded-[12px] border border-[#E1E4EA] p-[24px] gap-[20px] bg-[#FFFFFF] justify-between flex flex-col">
                <div class="flex items-center space-x-2.5">
                    <div
                        class="w-[40px] h-[40px] rounded-full border-2 border-[#E1E4EA] bg-[#F5F7FA] flex items-center justify-center">
                        <img src="/chart/outgoing.svg" alt="" class="w-[9.17px] h-auto">
                    </div>
                    <p class="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.011em] text-[#0E121B]">
                        Outgoing Messages</p>
                </div>
                <div class="">
                    <h1
                        class="font-inter font-medium text-[24px] leading-[32px] tracking-[-0.015em] text-[#0E121B] mb-1.5">
                        100
                    </h1>
                    <div class="flex items-center space-x-1.5">
                        <img src="/chart/arrow-down.svg" alt="">
                        <span
                            class="font-sans font-medium text-sm leading-5 tracking-[0em] text-center text-[#EF4444]">-5</span>
                        <p class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-[#525866]">
                            from yesterday
                        </p>
                    </div>
                </div>
                <div class="mb-4"><img src="/chart/2.png" alt=""></div>
            </div>

            <!-- Total Messages Card -->
            <div
                class="w-full rounded-[12px] border border-[#E1E4EA] p-[24px] gap-[20px] bg-[#FFFFFF] justify-between flex flex-col">
                <div class="flex items-center space-x-2.5">
                    <div
                        class="w-[40px] h-[40px] rounded-full border-2 border-[#E1E4EA] bg-[#F5F7FA] flex items-center justify-center">
                        <img src="/chart/total.svg" alt="" class=" h-auto">
                    </div>
                    <p class="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.011em] text-[#0E121B]">
                        Total Message</p>
                </div>
                <div class="">
                    <h1
                        class="font-inter font-medium text-[24px] leading-[32px] tracking-[-0.015em] text-[#0E121B] mb-1.5">
                        250
                    </h1>
                    <div class="flex items-center space-x-1.5">
                        <img src="/chart/arrow-up.svg" alt="">
                        <span
                            class="font-sans font-medium text-sm leading-5 tracking-[0em] text-center text-[#1FC16B]">+17</span>
                        <p class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-[#525866]">
                            total
                        </p>
                    </div>
                </div>
                <div class="mb-4"><img src="/chart/3.png" alt=""></div>
            </div>

            <!-- Response Rate Card -->
            <div
                class="w-full rounded-[12px] border border-[#E1E4EA] p-[24px] gap-[20px] bg-[#FFFFFF] justify-between flex flex-col">
                <div class="flex items-center space-x-2.5">
                    <div
                        class="w-[40px] h-[40px] rounded-full border-2 border-[#E1E4EA] bg-[#F5F7FA] flex items-center justify-center">
                        <img src="/chart/response.svg" alt="" class=" h-auto">
                    </div>
                    <p class="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.011em] text-[#0E121B]">
                        Response Rate</p>
                </div>
                <div class="">
                    <h1
                        class="font-inter font-medium text-[24px] leading-[32px] tracking-[-0.015em] text-[#0E121B] mb-1.5">
                        99.5%
                    </h1>
                    <div class="flex items-center space-x-1.5">

                        <p class="font-inter font-normal text-[12px] leading-[16px] tracking-[0em] text-[#525866]">
                            Automated response
                        </p>
                    </div>
                </div>
                <div class="mb-4"><img src="/chart/4.png" alt=""></div>
            </div>

        </div>
    </div>
</template>

<script>

</script>
