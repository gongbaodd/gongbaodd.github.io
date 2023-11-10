---
layout: post
category: tech
---

#《饥荒》作弊,顺便学习lua

1. 打开Console

    在～下面找DoNotStarve/settings.ini修改。

        ENABLECONSOLE = false
        
2. 游戏中点～键打开console。
    
        GetPlayer().components.builder:GiveAllRecipes() ---------- 全物品直接制造
        GetPlayer().components.hungerause(true) ---------- 饥饿值不降低
        GetPlayer().components.sanity:SetMax(500) ---------- 精神值不降低(慎用不可取消 )
        GetPlayer().components.health:SetMaxHealth(300) ---------- 最大血格
        GetPlayer().components.health:SetInvincible(true) ---------- 上帝模式

        minimap = TheSim:FindFirstEntityWithTag("minimap")--------------|
        minimap.MiniMap:ShowArea(0,0,0, 10000)----------- 开全地图，要输入2个指令才行
        
        for var x=1,1,10 do DebugSpawn("pigman") end -------------------出现十个猪人
        
        
        
        
        
        

