<!--
 * @Descripttion: 
 * @version: 
 * @Author: anxk
 * @Date: 2020-11-24 18:26:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-24 19:10:57
-->
git reset <commit_id> 回退到某个版本（内容不会回退，commit_id 会回退）

git reset --hard <commit_id> 回退到某个版本（内容和commit_id都会回退）

git rebase (单独操作，和远端操作)

单独操作：git rebase -i <commit_id>  基于这个commit_id进行变基
    e（edit）: 编辑
    p(pick): 不操作
    r(reword):变内容
    drop:丢掉
    squash:与上一个合并
    
    git add .
    git rebase --continue

和远端操作：
    
